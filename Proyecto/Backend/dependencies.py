import psycopg2
from jose import jwt
from datetime import datetime, timedelta, timezone
import bcrypt
import boto3    #pip install boto3 / pip3 install boto3
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2.credentials import Credentials
import json
import logging



# Configuraciones de JWT y conexión a la base de datos
SECRET_KEY = ""
TOKEN_SECONDS_EXP = 3600

s3_client = boto3.client(
    's3',
    aws_access_key_id='',
    aws_secret_access_key='',
    region_name='eu-north-1'
)
BUCKET_NAME = 'serppa'

def obtener_conexion():
    return psycopg2.connect(
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432",
        database="postgres"
    )

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt)

def verify_password(stored_password_hash, provided_password):
    return bcrypt.checkpw(provided_password.encode(), stored_password_hash)

def create_token(data: dict):
    data_token = data.copy()
    data_token["exp"] = datetime.now(timezone.utc) + timedelta(seconds=TOKEN_SECONDS_EXP)
    return jwt.encode(data_token, key=SECRET_KEY, algorithm="HS256")

def crear_token_verificacion(usuario_id):
    expiracion = datetime.now(timezone.utc) + timedelta(hours=12)  # Token válido por 12 horas
    payload = {'usuario_id': usuario_id, 'exp': expiracion}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def enviar_correo(email_destino, nombre_usuario, usuario_id):
    token = crear_token_verificacion(usuario_id)
    link_verificacion = f"http://localhost:8000/verificar/{token}"  # Asegúrate de cambiar esto según tu configuración

    # Configuración de la cuenta de correo y la contraseña de aplicación
    correo_gmail = "infoserppa@gmail.com"
    contrasena_app = "pehx nfyi ufpe zpyc"  # Asegúrate de usar aquí tu contraseña de aplicación real

    # Configuración del mensaje de correo
    mensaje = MIMEMultipart()
    mensaje['From'] = correo_gmail
    mensaje['To'] = email_destino
    mensaje['Subject'] = "Confirma tu cuenta en Serppa"
    cuerpo = f"<strong>Hola {nombre_usuario},</strong><br><br>Gracias por registrarte en Serppa. Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace:<br><a href='{link_verificacion}'>Confirmar Email</a><br><br>Equipo de Serppa"
    mensaje.attach(MIMEText(cuerpo, 'html'))

    try:
        # Establecer conexión con el servidor de Gmail y enviar el correo
        servidor = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        servidor.login(correo_gmail, contrasena_app)
        servidor.sendmail(correo_gmail, email_destino, mensaje.as_string())
        servidor.quit()
        print("Correo enviado exitosamente a", email_destino)
    except Exception as e:
        print("Error al enviar el correo:", e)
        raise Exception(f"No se pudo enviar el correo a {email_destino}")
    
    
def obtener_credenciales(google_credentials=None):
    try:
        if google_credentials:
            # Asegurarnos de que google_credentials es un diccionario
            if isinstance(google_credentials, str):
                google_credentials = json.loads(google_credentials)

            credentials = Credentials(
                token=google_credentials['token'],
                refresh_token=google_credentials['refresh_token'],
                token_uri=google_credentials['token_uri'],
                client_id=google_credentials['client_id'],
                client_secret=google_credentials['client_secret'],
                scopes=google_credentials['scopes']
            )
   
            return credentials
        else:
            scopes = ["https://www.googleapis.com/auth/analytics.readonly"]
            client_secrets_path = './client_secret_82213725276-4vpdplmlbctqus1av7fsmqt5k3ra7om0.apps.googleusercontent.com.json'  # Ajusta esta ruta según sea necesario
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_path, scopes=scopes)
            credentials = flow.run_local_server(port=8080)
            return credentials
        
    except Exception as e:
        logging.error(f"Error obtaining credentials: {e}")
        raise

def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }