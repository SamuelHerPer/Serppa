from fastapi import APIRouter, HTTPException, status, Response, Request
import psycopg2
from jose import jwt, JWTError # Esta es la librería para trabajar con JSON Web Tokens
from dependencies import SECRET_KEY , obtener_conexion
from models import Organizacion



router = APIRouter()


@router.post("/organizaciones/", status_code=status.HTTP_201_CREATED)
def insertar_organizacion(org_data: Organizacion, request: Request, response: Response): #Recibe organizacion definido arriba.
    #Lo que hacemos siempre para verificar si hay cookie es decir si esta la sesion iniciada.
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="Acceso no autorizado")
    
    try:
        # Decodifica el token JWT utilizando la clave secreta y el algoritmo HS256
        # Si la decodificación es exitosa, significa que el token es válido y aún no ha expirado
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        #También confirmamos que contenga user_id.
        usuario_id = payload.get("user_id")
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Acceso no autorizado")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    try:
        #Insertamos la nueva organización
        cursor.execute("""
        INSERT INTO organizacion (nombre, email_empresa, razon_social, direccion_fiscal) 
        VALUES (%s, %s, %s, %s) RETURNING id
        """, (org_data.nombre, org_data.email_empresa, org_data.razon_social, org_data.direccion_fiscal))
        organizacion_id = cursor.fetchone()[0]

        #Asociamos el usuario logueado con la nueva organización
        cursor.execute("""
        INSERT INTO user_orga (usuario_id, organizacion_id) 
        VALUES (%s, %s)
        """, (usuario_id, organizacion_id))

        conexion.commit()
        return {"message": "Organización creada exitosamente", "organizacion_id": organizacion_id}
    except (Exception, psycopg2.Error) as error:
        #Si ocurre cualquier excepción durante la ejecución de las consultas, se realiza un rollback para deshacer todas las transacciones en caso de error.
        conexion.rollback()
        raise HTTPException(status_code=400, detail=str(error))
    finally:
        cursor.close()
        conexion.close()


@router.get("/organizaciones-usuario/")
def obtener_organizaciones_usuario(request: Request):
    #Como en los anteriores comprobamos que exista un token.
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="Acceso no autorizado")
    
    try:
        # Decodifica el token JWT utilizando la clave secreta y el algoritmo HS256
        # Si la decodificación es exitosa, significa que el token es válido y aún no ha expirado
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        usuario_id = payload.get("user_id")
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Acceso no autorizado")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    try:
        #Ejecutamos la consulta para obtener las organizaciones asociadas al usuario logueado.
        cursor.execute("""
        SELECT o.id, o.nombre, o.email_empresa, o.razon_social, o.direccion_fiscal FROM organizacion o
        JOIN user_orga uo ON o.id = uo.organizacion_id
        WHERE uo.usuario_id = %s
        """, (usuario_id,))
        organizaciones = cursor.fetchall()
        return [{"id": org[0], "nombre": org[1], "email_empresa": org[2], "razon_social": org[3], "direccion_fiscal": org[4]} for org in organizaciones]
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
    finally:
        cursor.close()
        conexion.close()