from fastapi import APIRouter,Depends, HTTPException, status, Request
import psycopg2
from jose import jwt, JWTError # Esta es la librería para trabajar con JSON Web Tokens
from dependencies import SECRET_KEY , obtener_conexion, obtener_credenciales, credentials_to_dict
from models import Proyecto, GoogleAnalyticsProperty
from google.auth.transport.requests import Request as GoogleRequest
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest
import logging
import json




router = APIRouter()


@router.post("/proyectos/{proyecto_id}/google-analytics")
async def obtener_datos_google_analytics(proyecto_id: int, property: GoogleAnalyticsProperty, request: Request):
    try:

        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("SELECT google_credentials FROM proyecto WHERE id = %s", (proyecto_id,))
        result = cursor.fetchone()
        google_credentials = result[0] if result else None
        cursor.close()
        conexion.close()

        if not google_credentials:
            raise HTTPException(status_code=400, detail="No Google credentials found")


        # Convertir a diccionario si es necesario
        if isinstance(google_credentials, str):
            google_credentials = json.loads(google_credentials)

        credentials = obtener_credenciales(google_credentials)

        client = BetaAnalyticsDataClient(credentials=credentials)

        analytics_request = RunReportRequest(
            property=f"properties/{property.property_id}",
            dimensions=[
                Dimension(name="landingPagePlusQueryString"),
                Dimension(name="date"),
                Dimension(name="sessionSource"),
                Dimension(name="sessionMedium")
            ],
            metrics=[Metric(name="sessions")],
            date_ranges=[DateRange(start_date="2024-01-01", end_date="2024-05-16")]
        )

        response = client.run_report(request=analytics_request)

        report = []
        for row in response.rows:
            report.append({
                "landingPagePlusQueryString": row.dimension_values[0].value,
                "date": row.dimension_values[1].value,
                "sessionSource": row.dimension_values[2].value,
                "sessionMedium": row.dimension_values[3].value,
                "sessions": row.metric_values[0].value
            })

        report_sorted = sorted(report, key=lambda x: x["date"])
        return report_sorted

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.post("/proyectos/{proyecto_id}/actualizar-google-analytics")
async def actualizar_google_analytics(proyecto_id: int, property: GoogleAnalyticsProperty, request: Request):
    try:
        credentials = obtener_credenciales()
        client = BetaAnalyticsDataClient(credentials=credentials)

        # Simular una llamada de API para validar y obtener credenciales actualizadas
        analytics_request = RunReportRequest(
            property=f"properties/{property.property_id}",
            dimensions=[Dimension(name="date")],
            metrics=[Metric(name="sessions")],
            date_ranges=[DateRange(start_date="2024-01-01", end_date="2024-01-01")]
        )
        client.run_report(request=analytics_request)

        # Actualizar el ID de la propiedad de Google Analytics y las credenciales en la base de datos
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("""
        UPDATE proyecto 
        SET google_analytics_property_id = %s, google_credentials = %s
        WHERE id = %s
        """, (property.property_id, json.dumps(credentials_to_dict(credentials)), proyecto_id))
        conexion.commit()
        cursor.close()
        conexion.close()

        return {"message": "Google Analytics property ID and credentials updated successfully"}

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    

@router.post("/proyectos/", status_code=status.HTTP_201_CREATED)
def insertar_proyecto(project_data: Proyecto, request: Request):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="Acceso no autorizado")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        usuario_id = payload.get("user_id")
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Acceso no autorizado")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    # Verificar que la organización exista
    cursor.execute("SELECT id FROM organizacion WHERE id = %s", (project_data.organizacion_id,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Organización no encontrada")
    
    try:
        # Inserción en la base de datos con manejo de campos opcionales
        cursor.execute("""
        INSERT INTO proyecto (
            nombre_dominio, 
            descripcion, 
            organizacion_id, 
            google_analytics_property_id, 
            google_credentials
        ) VALUES (%s, %s, %s, %s, %s) RETURNING id
        """, (
            project_data.nombre_dominio,
            project_data.descripcion,
            project_data.organizacion_id,
            project_data.google_analytics_property_id or None,  # Manejar vacío como None
            json.dumps(project_data.google_credentials) if project_data.google_credentials else None  # Manejar vacío como None
        ))
        proyecto_id = cursor.fetchone()[0]
        conexion.commit()
        return {"message": "Proyecto creado exitosamente", "proyecto_id": proyecto_id}
    except (Exception, psycopg2.Error) as error:
        conexion.rollback()
        raise HTTPException(status_code=400, detail=str(error))
    finally:
        cursor.close()
        conexion.close()

        
        
@router.get("/proyectos-usuario/")
def obtener_proyectos_usuario(request: Request):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="Acceso no autorizado")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        usuario_id = payload.get("user_id")
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Acceso no autorizado")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    try:
        cursor.execute("""
        SELECT p.id, p.nombre_dominio, p.descripcion, p.api_key, p.control_tareas, p.dashboard, p.monitor_posiciones, p.control_enlaces, p.drive, p.organizacion_id, o.nombre AS nombre_organizacion, p.google_analytics_property_id, p.google_credentials
        FROM proyecto p
        JOIN organizacion o ON p.organizacion_id = o.id
        JOIN user_orga uo ON o.id = uo.organizacion_id
        WHERE uo.usuario_id = %s
        """, (usuario_id,))
        proyectos = cursor.fetchall()
        return [{"id": proyecto[0], "nombre_dominio": proyecto[1], "descripcion": proyecto[2], "api_key": proyecto[3], "control_tareas": proyecto[4], "dashboard": proyecto[5], "monitor_posiciones": proyecto[6], "control_enlaces": proyecto[7], "drive": proyecto[8],  "organizacion_id": proyecto[9], "nombre_organizacion": proyecto[10], "google_analytics_property_id": proyecto[11], "google_credentials": proyecto[12]} for proyecto in proyectos]
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
    finally:
        cursor.close()
        conexion.close()
