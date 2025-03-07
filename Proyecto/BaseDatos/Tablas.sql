--Tabla Usuarios:
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    empresa VARCHAR(255),
    pais VARCHAR(255) ,
    ciudad VARCHAR(255) ,
    password VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255),
    verificado BOOLEAN DEFAULT FALSE
);

--Tabla organizaciones:
CREATE TABLE organizacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email_empresa VARCHAR(255)  NOT NULL,
    razon_social VARCHAR(255) NOT NULL,
    direccion_fiscal VARCHAR(255) NOT NULL
);

--Relación User con Organizacion:
CREATE TABLE user_orga (
    usuario_id INTEGER NOT NULL,
    organizacion_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_id, organizacion_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (organizacion_id) REFERENCES organizacion(id) ON DELETE CASCADE
);


-- Creación de la tabla cliente
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(255) NOT NULL
);

-- Creación de la tabla intermedia lista_clientes para relación N:N
CREATE TABLE lista_clientes (
    cliente_id INTEGER NOT NULL,
    organizacion_id INTEGER NOT NULL,
    PRIMARY KEY (cliente_id, organizacion_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (organizacion_id) REFERENCES organizacion(id) ON DELETE CASCADE
);

-- Creación de la tabla proyecto
CREATE TABLE proyecto (
    id SERIAL PRIMARY KEY,
    nombre_dominio VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    API_KEY VARCHAR(255),
    ID_google_propiedad INTEGER,
    control_tareas BOOLEAN,
    dashboard BOOLEAN,
    monitor_posiciones BOOLEAN,
    control_enlaces BOOLEAN,
    drive VARCHAR(255),
    organizacion_id INTEGER NOT NULL,
    google_analytics_property_id VARCHAR(255),  -- Nuevo campo opcional
    google_credentials JSONB,  -- Nuevo campo para almacenar credenciales en formato JSON
    FOREIGN KEY (organizacion_id) REFERENCES organizacion(id) ON DELETE CASCADE
);


-- Creación de la tabla historico_analisis
CREATE TABLE historico_analisis (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    visitas INTEGER,
    duracion_sesion FLOAT,
    conversiones INTEGER,
    proyecto_id INTEGER,
    FOREIGN KEY (proyecto_id) REFERENCES proyecto(id) ON DELETE CASCADE
);


-- Creación de la tabla categoria
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    google_analytics VARCHAR(255),
    semrush VARCHAR(255)
);

-- DROPS

DROP TABLE IF EXISTS historico_analisis;
DROP TABLE IF EXISTS lista_clientes;
DROP TABLE IF EXISTS user_orga;

-- Luego las tablas a las que estas dependen
DROP TABLE IF EXISTS proyecto;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS organizacion;

-- Finalmente, las tablas que no tienen dependencias de otras tablas
DROP TABLE IF EXISTS categoria;