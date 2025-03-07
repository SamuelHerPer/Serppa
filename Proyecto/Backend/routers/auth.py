
from fastapi import APIRouter, HTTPException, Response, Request
from jose import jwt, JWTError # Esta es la librería para trabajar con JSON Web Tokens
from models import Login
from dependencies import SECRET_KEY, obtener_conexion, verify_password, create_token

router = APIRouter()

@router.post("/login/")
def login(login: Login, response: Response):
    print("Datos recibidos:", login)
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT id, password, verificado FROM usuario WHERE email = %s", (login.email,))
    usuario = cursor.fetchone()
    cursor.close()
    conexion.close()

    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario_id, stored_password, verificado = usuario

    if not verify_password(stored_password.encode('utf-8'), login.password):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    if not verificado:
        raise HTTPException(status_code=403, detail="Por favor verifica tu correo electrónico antes de iniciar sesión.")

    token = create_token({"user_id": usuario_id})
    response.set_cookie(key="access_token", value=token, httponly=True,max_age=3600, path='/', secure=False, samesite='Lax')  # Considerar cambiar secure=True en producción
    return {"message": "Inicio de sesión exitoso", "usuario_id": usuario_id}



@router.get("/verify-token")
def verify_token(request: Request):
    # Recuperamos el token JWT desde las cookies del request
    token = request.cookies.get('access_token')
    #Si no hay token devuelve false en el log.
    if token is None:
        return {"isLoggedIn": False}
    try:
        # Decodifica el token JWT utilizando la clave secreta y el algoritmo HS256
        # Si la decodificación es exitosa, significa que el token es válido y aún no ha expirado
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        #Devolvemos que el usuario está logueado es decir es true y su id.
        return {"isLoggedIn": True, "user_id": payload.get("user_id")}
    except JWTError:
        return {"isLoggedIn": False}
    

@router.post("/logout/")
def logout(response: Response):
    # Elimina la cookie 'access_token' especificando la misma ruta que fue usada para setearla
    response.delete_cookie(key="access_token", path='/')
    return {"message": "Sesión cerrada exitosamente"}


  
""" Verificar usuario con link del gmail """      
@router.get("/verificar/{token}")
async def verificar_usuario(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        usuario_id = payload['usuario_id']

        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("UPDATE usuario SET verificado = TRUE WHERE id = %s", (usuario_id,))
        conexion.commit()
        return {"mensaje": "Correo verificado correctamente!"}
    except JWTError:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")
    finally:
        cursor.close()
        conexion.close()