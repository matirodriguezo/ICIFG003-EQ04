# 🏫 Plataforma Integrada de Inspectoría - Colegio Marcela Paz

Sistema web integral desarrollado para la gestión de alumnos, catálogo normativo y auditoría de convivencia escolar (incidentes) del Colegio Marcela Paz, sede Concepción. El proyecto presenta una arquitectura cliente-servidor lista para ejecución en entornos locales.

---

## 🛠️ Stack Tecnológico

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

## 🚀 Características Principales (Módulos)

1. **Landing Page & Autenticación:** * Portal público de presentación institucional.
   * Interfaz de Login interactiva para funcionarios.
2. **Directorio Estudiantil (CRUD Alumnos):** * Gestión completa de estudiantes.
   * Manejo compuesto de cursos (Nivel + Letra).
3. **Catálogo Normativo (Protocolos):** * Listado de instrumentos de convivencia escolar.
   * Control de estados (Vigente / Inactivo).
4. **Auditoría de Incidentes (Registro de Casos):** * Cruce relacional entre Alumnos y Protocolos.
   * **Sistema de Auditoría (Soft Delete):** Los incidentes no se borran físicamente de la base de datos para mantener la integridad legal. Se anulan y exigen justificación obligatoria.
   * **Bitácora Inmutable:** Historial multilínea con marca de tiempo (Timestamp) de cada modificación o anulación realizada por los inspectores.

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu entorno local:
* **Node.js** (v18 o superior) y npm.
* **Angular CLI** instalado globalmente (`npm install -g @angular/cli`).
* **Java JDK 17**.
* **PostgreSQL** corriendo localmente en el puerto `5432`.
* IDE recomendado: VS Code (para Frontend) / Eclipse o IntelliJ IDEA (para Backend).

---

## 🔧 Instalación y Ejecución Local

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

## 📂 Estructura del Proyecto Frontend

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