from pydantic import BaseModel, EmailStr
from typing import Optional, Dict



class UsuarioRespuesta(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    empresa: Optional[str] = None
    pais: str
    ciudad: str

""" Modelos Autentificación """

class Login(BaseModel):
    email: EmailStr
    password: str

""" -------------------------------- """

class Organizacion(BaseModel):
    nombre: str
    email_empresa: EmailStr
    razon_social: str
    direccion_fiscal: str


class Proyecto(BaseModel):
    nombre_dominio: str
    descripcion: str
    organizacion_id: int
    google_analytics_property_id: Optional[str] = None
    google_credentials: Optional[Dict] = None

    
class GoogleAnalyticsProperty(BaseModel):
    property_id: str
