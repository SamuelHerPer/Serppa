""" Clave de acceso S3: 
    Clave de acceso S3: """
""" pip3 install boto3 """
""" pip3 install sendgrid """

""" Clave gmail: pehx nfyi ufpe zpyc  """

from fastapi import APIRouter, HTTPException, status, Request, File, UploadFile, Form
from pydantic import  EmailStr
import psycopg2
from typing import Optional
from jose import jwt, JWTError # Esta es la librería para trabajar con JSON Web Tokens
from botocore.exceptions import NoCredentialsError
from dependencies import SECRET_KEY , obtener_conexion, hash_password, BUCKET_NAME, s3_client, enviar_correo

router = APIRouter()

@router.post("/usuarios/", status_code=status.HTTP_201_CREATED)
async def insertar_usuario(nombre: str = Form(...), email: EmailStr = Form(...), password: str = Form(...)):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    hashed_password = hash_password(password).decode('utf-8')
    try:
        cursor.execute("INSERT INTO usuario (nombre, email, password) VALUES (%s, %s, %s) RETURNING id", (nombre, email, hashed_password))
        usuario_id = cursor.fetchone()[0]
        conexion.commit()
        
        
        # Envío del correo de verificación usando la función modificada
        enviar_correo(email, nombre, usuario_id)
        
        return {"id": usuario_id, "nombre": nombre, "email": email}
    except (Exception, psycopg2.Error) as error:
        conexion.rollback()
        raise HTTPException(status_code=400, detail=str(error))
    finally:
        cursor.close()
        conexion.close()
        
        
@router.get("/perfil-usuario/")
def obtener_perfil_usuario(request: Request):
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
        SELECT id, nombre, email, empresa, pais, ciudad, foto_perfil FROM usuario WHERE id = %s
        """, (usuario_id,))
        usuario = cursor.fetchone()
        if usuario:
            id, nombre, email, empresa, pais, ciudad, foto_perfil = usuario
            # Aquí no necesitamos convertir la foto de perfil porque ya es una URL
            perfil_usuario = {
                "id": id,
                "nombre": nombre,
                "email": email,
                "empresa": empresa,
                "pais": pais,
                "ciudad": ciudad,
                "foto_perfil": foto_perfil  # Esta es la URL de la imagen en S3
            }
            return perfil_usuario
        else:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Exception as error:
        print(f"Error al obtener datos del usuario: {error}")
        raise HTTPException(status_code=500, detail=f"Error al obtener los datos del usuario: {error}")
    finally:
        cursor.close()
        conexion.close()


        
@router.put("/perfil-usuario/{usuario_id}", status_code=status.HTTP_200_OK)
async def actualizar_perfil_usuario(request: Request, usuario_id: int, nombre: Optional[str] = Form(None),
                                    empresa: Optional[str] = Form(None), pais: Optional[str] = Form(None),
                                    ciudad: Optional[str] = Form(None), foto_perfil: UploadFile = File(None)):
    token = request.cookies.get('access_token')
    if not token:
        raise HTTPException(status_code=401, detail="Acceso no autorizado")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        usuario_id_token = payload.get("user_id")
        if usuario_id_token != usuario_id:
            raise HTTPException(status_code=401, detail="Acceso no autorizado")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    foto_perfil_url = None
    if foto_perfil:
        file_path = f"perfiles/{usuario_id}/{foto_perfil.filename}"
        try:
            s3_client.upload_fileobj(foto_perfil.file, BUCKET_NAME, file_path)
            foto_perfil_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_path}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al subir el archivo a S3: {str(e)}")

    update_values = (nombre, empresa, pais, ciudad, foto_perfil_url or None, usuario_id)

    try:
        cursor.execute("""
            UPDATE usuario SET nombre = COALESCE(%s, nombre), 
                               empresa = COALESCE(%s, empresa), 
                               pais = COALESCE(%s, pais), 
                               ciudad = COALESCE(%s, ciudad), 
                               foto_perfil = COALESCE(%s, foto_perfil)
            WHERE id = %s
        """, update_values)
        conexion.commit()
    except Exception as e:
        conexion.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conexion.close()
        
