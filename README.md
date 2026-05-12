#  Plataforma Integrada de Inspectoría - Colegio Marcela Paz

Sistema web integral desarrollado para la gestión de alumnos, catálogo normativo y auditoría de convivencia escolar (incidentes) del Colegio Marcela Paz, sede Concepción. El proyecto presenta una arquitectura cliente-servidor lista para ejecución en entornos locales.

---

##  Stack Tecnológico

### Frontend (Cliente)
* **Framework:** Angular 17+ (Arquitectura basada en Standalone Components).
* **Estilos y UI:** Bootstrap 5 (Input groups, cards, modales) y CSS personalizado.
* **Iconografía:** Bootstrap Icons.
* **Lenguaje:** TypeScript / HTML5 / CSS3.

### Backend (Servidor / API REST)
* **Framework:** Spring Boot 2.5.9.
* **Lenguaje:** Java 17.
* **Persistencia:** Spring Data JPA / Hibernate.
* **Herramientas Adicionales:** Lombok (para reducción de código repetitivo).

### Base de Datos
* **Motor SQL:** PostgreSQL 16.

---

##  Características Principales (Módulos)

1. **Landing Page & Autenticación:** * Portal público de presentación institucional.
   * Interfaz de Login interactiva con credenciales centralizadas.
2. **Directorio Estudiantil (CRUD Alumnos):** * Gestión completa de estudiantes.
   * Manejo compuesto de cursos (Nivel + Letra).
3. **Catálogo Normativo (Protocolos):** * Listado de instrumentos de convivencia escolar.
   * Control de estados (Vigente / Inactivo).
4. **Auditoría de Incidentes (Registro de Casos):** * Cruce relacional entre Alumnos y Protocolos.
   * **Sistema de Auditoría (Soft Delete):** Los incidentes no se borran físicamente de la base de datos para mantener la integridad legal. Se anulan y exigen justificación obligatoria.
   * **Bitácora Inmutable:** Historial multilínea con marca de tiempo (Timestamp) de cada modificación o anulación realizada por los inspectores.

---

##  Requisitos Previos

Asegúrate de tener instalado en tu entorno local:
* **Node.js** (v18 o superior) y npm.
* **Angular CLI** instalado globalmente (`npm install -g @angular/cli`).
* **Java JDK 17**.
* **PostgreSQL** corriendo localmente en el puerto `5432`.
* IDE recomendado: VS Code (para Frontend) / Eclipse o IntelliJ IDEA (para Backend).

---

##  Instalación y Ejecución Local

### Paso 1: Configuración de la Base de Datos
1. Abre pgAdmin o la terminal de comandos de PostgreSQL (psql).
2. Crea una base de datos en blanco llamada `demo02`.
3. Asegúrate de que las credenciales locales de tu PostgreSQL coincidan con las configuradas en el archivo `application.properties` del backend:
   * **Usuario:** `postgres`
   * **Contraseña:** `1234`
   * **Puerto:** `5432`

### Paso 2: Ejecución del Backend (Spring Boot)
1. Abre el proyecto del backend en tu IDE (Eclipse/IntelliJ) o mediante una terminal en la raíz del proyecto.
2. Si usas terminal, compila y ejecuta el proyecto usando Maven Wrapper:

       ./mvnw clean spring-boot:run

3. El servidor iniciará y la base de datos creará las tablas automáticamente gracias a Hibernate. El backend quedará expuesto en el puerto `8884` (`http://localhost:8884`).

### Paso 3: Configuración y Ejecución del Frontend (Angular)
1. Abre una nueva terminal en la carpeta raíz del proyecto frontend.
2. Instala las dependencias base de Angular:

       npm install

3. Instala las dependencias de diseño (Bootstrap y sus íconos):

       npm install bootstrap bootstrap-icons

4. Levanta el servidor de desarrollo local de Angular:

       ng serve

5. Abre tu navegador web de preferencia y accede a: `http://localhost:4200/`

---

##  Credenciales de Acceso

El sistema está protegido. Para ingresar a los módulos de administración, debes utilizar la siguiente cuenta exclusiva:
* **Correo Institucional:** `admin@colegio.cl`
* **Contraseña:** `admin123`

---

##  Ejemplo de Flujo de Uso

Para comprobar el correcto funcionamiento de las relaciones del sistema, puedes seguir este flujo de prueba paso a paso:

1. **Ingreso a la Plataforma:**
   * Accede a la *Landing Page* institucional (`http://localhost:4200/`).
   * Haz clic en **"Iniciar Sesión"**.
   * Ingresa las **únicas credenciales válidas** (`admin@colegio.cl` / `admin123`) y presiona "Ingresar al Sistema". Serás redirigido al Panel de Control.

2. **Registro de Alumno Base:**
   * En el Panel de Control, ingresa al módulo **"Gestión de Alumnos"**.
   * Completa el formulario de la izquierda con datos ficticios (RUT, Nombres, Apellidos) y selecciona un curso (Ej: `2° Medio` y letra `B`).
   * Presiona **"Registrar en Sistema"**. Verifica que el estudiante aparezca correctamente en la tabla de la derecha con su curso concatenado.
   * Presiona "Volver al Menú".

3. **Verificación de Normativa:**
   * Ingresa al módulo **"Catálogo Normativo"**.
   * Verifica que exista al menos un protocolo habilitado (en verde). Si no hay ninguno, créalo usando el botón "Nuevo" (Ej: *Protocolo de Agresión Física*).
   * Vuelve al menú principal.

4. **Registro de Incidente (Cruce de Datos):**
   * Ingresa al módulo **"Registro de Casos"**.
   * En el formulario, despliega la lista "Identificar Alumno"; selecciona al estudiante que creaste en el paso 2.
   * Selecciona el protocolo verificado en el paso 3.
   * Asigna una fecha, un responsable y escribe una descripción objetiva del hecho.
   * Presiona **"Registrar Acta Oficial"**.

5. **Auditoría y Bitácora (Soft Delete):**
   * Ubica el incidente recién creado en la tabla de *Historial de Convivencia Escolar* (a la derecha).
   * Haz clic en el botón amarillo (Editar). El sistema te pedirá justificar la modificación. Ingresa: *"Se agregan más detalles al relato"*. Verifica cómo esto se añade a la bitácora visible del registro.
   * Finalmente, haz clic en el botón rojo (Anular). El sistema te obligará a ingresar un motivo. Escribe: *"Error de tipificación"*. 
   * Observa cómo el registro no desaparece, sino que pasa a estado **ANULADO**, su color se atenúa, los botones de acción se bloquean ("Registro Inalterable") y la justificación queda plasmada permanentemente en la bitácora de auditoría.

---

##  Estructura del Proyecto Frontend

La interfaz gráfica mantiene una estructura modularizada para facilitar el mantenimiento y la escalabilidad del código:

* **`/src/app/models`:** Interfaces de TypeScript para el tipado estricto (`Persona`, `Incidente`, `Protocolo`).
* **`/src/app/services`:** Conexión HTTP (`GET`, `POST`, `PUT`, `DELETE`) hacia la API REST en el puerto 8884.
* **`/src/app/components`:** * `/landing` (Portal Público Institucional)
  * `/login` (Acceso seguro del personal)
  * `/menu` (Panel de Control Operativo)
  * `/personas` (Módulo de Directorio Estudiantil)
  * `/protocolos` (Catálogo Normativo)
  * `/incidentes` (Auditoría de Casos y Bitácora)

---