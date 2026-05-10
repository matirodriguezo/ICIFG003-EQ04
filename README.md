# Sistema Integrado - Colegio Marcela Paz (Taller 2)

Este repositorio contiene la entrega del Taller 2 para la asignatura. El sistema gestiona alumnos, el catálogo normativo de protocolos del colegio, y el registro de incidentes (funcionalidad de negocio).

## Estructura del Proyecto
* `/backend`: API REST desarrollada en Spring Boot (Java 17).
* `/frontend`: Aplicación cliente desarrollada en Angular 17.

## Prerrequisitos
* PostgreSQL (Versión 16 o superior) o Docker.
* Java 17 (JDK).
* Node.js y Angular CLI.

## Instrucciones de Ejecución

### 1. Base de Datos (PostgreSQL)
1. Crear una base de datos local llamada `demo02`.
2. Las credenciales por defecto configuradas en el backend son:
   * Usuario: `postgres`
   * Clave: `1234`
3. Al iniciar el backend, las tablas se crearán automáticamente gracias a Hibernate.
4. Para poder iniciar sesión, ejecute el siguiente script SQL en la base de datos `demo02`:
   ```sql
   INSERT INTO usuarios (correo, contrasena, rol) VALUES ('admin@colegio.cl', 'admin123', 'INSPECTOR');