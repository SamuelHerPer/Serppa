# Serppa

Serppa es un panel para acceder a los recursos SEO de los proyectos y tener una vista rápida de la evolución del tráfico orgánico. Principales características:

- Crear y gestionar organizaciones
- Crear y gestionar proyectos
- Añadir usuarios tanto a los proyectos como a las organizaciones
- Sincronizar tu cuenta de google para gestionar los recursos de los proyectos
- Controlar el tráfico orgánico mediante la herramienta GA4 (Google Analytics 4)
- Muchas cosas más

\
Este proyecto fue desarrollado durante el periodo de **Formación en Centros de Trabajo (FCT)** del ciclo formativo de grado superior en Desarrollo de Aplicaciones Web (DAW).


## Tecnologias utilizadas
<p align="left">
  <img src="./Proyecto/Docs/icons/html5-original.svg" alt="HTML" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/css3-original.svg" alt="CSS" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/javascript-original.svg" alt="JavaScript" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/react-original.svg" alt="React" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/nodejs-original.svg" alt="Nodejs" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/vitejs-original.svg" alt="Vite" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/python-original-wordmark.svg" alt="Python" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/fastapi-original.svg" alt="FastAPI" width="70" height="70"/>
  <img src="./Proyecto/Docs/icons/postgresql-original-wordmark.svg" alt="PostgreSQL" width="70" height="70"/>
</p>

## INSTALACIÓN

### TECNOLOGIAS A UTILIZAR

Instalar python desde web oficial (https://www.python.org/downloads/).
\
Instalar NodeJS desde web oficial preferiblemente la versión LTS (https://nodejs.org/en).
\
Instalar PostgreSQL desde web oficial (https://www.postgresql.org/download/).
\
Descargar el proyecto de github o clonarlo (https://github.com/SamuelHerPer/Serppa.git).

### BASE DE DATOS

```
1. Abrir el cliente de pgAdmin 4 (Viene incluido en la instalación de PostgreSQL).
2. En el dashboard principal de Servers hacer clic en "Add New Server".
3. En la pestaña de General en el "Name" introducir el nombre de la base de datos.
4. En la pestaña de Connection en el "Host" -> "name/address" introducir la dirección ip donde se aloja la base de datos (en este caso introducir 'localhost').
5. En el "Port" indicamos el puerto de la base de datos aunque también se puede dejar por defecto como en este caso (5432).
6. En el apartado de "Username" lo dejamos por defecto 'postgres' (este es el username que hay que usar en la conexion de python).
7. En el apartado de "Password" indicamos la contraseña de la base de datos, la que quieras (esta es la contraseña que hay que usar en la conexión de python).
8. El resto lo dejamos por defecto y damos clic en "save".
9. En nuestro nuevo server creado desplegamos con la flecha Databases > postgres > Schemas > public.
10. En "tables" damos clic derecho y seleccionamos "Query Tool".
11. Una vez aquí vamos la carpeta "BaseDatos" del proyecto y copiamos todo el contenido en la "Query Tool" y lo ejecutamos con el botón de "play" que hay arriba.
```

### BACKEND 

#### Entrar en la carpeta "Backend" e instalar desde consola lo siguiente:

    pip install uvicorn fastapi ython-multipart bcrypt email-validator psycopg2 pyjwt python-jose[cryptography] aiosmtplib boto3 google-auth google-analytics-data --upgrade google-analytics-data google-analytics-data google-auth google-auth-oauthlib google-api-python-client --upgrade google-auth google-auth-oauthlib google-analytics-data --upgrade google-auth-oauthlib

#### Si no funciona el anterior, podemos instalarlos uno a uno:

```
1. pip install uvicorn
2. pip install fastapi
3. pip install python-multipart
4. pip install bcrypt
5. pip install email-validator
6. pip install psycopg2
7. pip install pyjwt
8. pip install python-jose[cryptography]
9. pip install aiosmtplib
10. pip install boto3
11. pip install google-auth google-analytics-data
12. pip install --upgrade google-analytics-data
13. pip install google-analytics-data
14. pip install google-auth google-auth-oauthlib google-api-python-client
15. pip install --upgrade google-auth google-auth-oauthlib google-analytics-data
16. pip install --upgrade google-auth-oauthlib
```

#### En caso de no funcionar con pip, los instalamos con pip3:

    pip3 install uvicorn fastapi ython-multipart bcrypt email-validator psycopg2 pyjwt python-jose[cryptography] aiosmtplib boto3 google-auth google-analytics-data --upgrade google-analytics-data google-analytics-data google-auth google-auth-oauthlib google-api-python-client --upgrade google-auth google-auth-oauthlib google-analytics-data --upgrade google-auth-oauthlib

#### Si no funciona el anterior, podemos instalarlos uno a uno:

```
1. pip3 install uvicorn
2. pip3 install fastapi
3. pip3 install python-multipart
4. pip3 install bcrypt
5. pip3 install email-validator
6. pip3 install psycopg2
7. pip3 install pyjwt
8. pip3 install python-jose[cryptography]
9. pip3 install aiosmtplib
10. pip3 install boto3
11. pip3 install google-auth google-analytics-data
12. pip3 install --upgrade google-analytics-data
13. pip3 install google-analytics-data
14. pip3 install google-auth google-auth-oauthlib google-api-python-client
15. pip3 install --upgrade google-auth google-auth-oauthlib google-analytics-data
16. pip3 install --upgrade google-auth-oauthlib
```

### Para ejecutar backend desde consola, entrar en la carpeta "Backend" y ejectuar:

    Uvicorn ConexionBD:app --reload
\
(Se ejecuta el fichero que contiene la conexión a la base de datos, en este caso 'ConexionBD').

### FRONTEND

#### Para instalar dependencias del frontend desde la consola, entrar a la carpeta 'React' y ejecutar:

    npm install

#### Para ejecutar frontend, desde consola entrar a la carpeta 'React' y ejecutar:

    npm run dev
\
(esto abre un servidor en localhost:5173, si a continuación pulsamos la letra 'o' abre el proyecto en nuestro navegador por defecto).


### Cada vez que se quiera utilizar el proyecto

#### ARRANCARLO

Abrimos una terminal y ejecutamos el backend desde la carpeta 'Backend' con el comando:

    Uvicorn ConexionBD:app --reload

Dejará esa terminal bloqueada en segundo plano.

Vamos a otra terminal y ejecutamos el frontend desde la carpeta 'React' con el comando:

    npm run dev

Dejará esa terminal bloqueda en segundo plano (en esta terminal es donde puedes pulsar 'o' para abrir el proyecto en tu navegador).

#### APAGARLO
Vamos a la terminal donde se está ejecutando el frontend.
Pulsamos la letra 'q'.

Vamos a la terminal donde se está ejecutando el backend.
Pulsamos control + c.