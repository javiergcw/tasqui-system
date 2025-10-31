# Flujo de Aplicación - Tasqui Jobs

## Resumen del Proyecto
**Tasqui Jobs** es una plataforma de empleos desarrollada con Next.js que conecta aspirantes (labour/empleados) con empleadores (employers/companies) mediante un sistema de tickets de solicitud de empleos gestionado por administradores.

**Arquitectura de Roles:**
- **Admin**: Gestiona y crea trabajos basados en solicitudes (tickets) de empleadores
- **Employer/Company**: Crea tickets de solicitud de trabajos, gestiona aplicaciones y candidatos
- **Employee/Labour**: Busca trabajos, aplica a vacantes y gestiona su perfil profesional
- **Publico**: Navega y busca trabajos sin autenticación

---

## 📋 Flujo General de la Aplicación

### 1. Flujo de Autenticación y Registro

#### Registro de Usuarios
**Ruta:** `/register`

1. Usuario accede a la página de registro
2. Selecciona tipo de rol:
   - **Company** (Employer/Empleador)
   - **Employee** (Labour/Aspirante)
3. Completar formulario según el rol seleccionado:
   - **Company**: Datos de empresa, nombre comercial, NIT, sitio web
   - **Employee**: Datos personales, ubicación, headline profesional
4. Sistema crea usuario en `app_user` y perfil correspondiente (`employer_profile` o `labour_profile`)
5. Asignación de roles mediante `app_user_role` basado en `user_role`

#### Inicio de Sesión
**Ruta:** `/login`

1. Usuario ingresa email y contraseña
2. Sistema valida credenciales
3. Verifica roles asignados al usuario
4. Redirección según rol:
   - **Admin** → `/admin/my-jobs`
   - **Employer** → `/company/my-jobs`
   - **Employee** → `/employee/profile`

---

### 2. Flujo de Creación de Trabajos (Nuevo Sistema de Tickets)

#### Proceso Completo: Employer → Ticket (Intención) → Admin → Job Real

**⚠️ FILOSOFÍA DEL SISTEMA:**
- El **employer solo expresa la intención** de crear una vacante mediante un ticket (solicitud muy simple).
- El **admin revisa esa intención** y es quien crea el job real (el employer NO publica directamente).
- El **ticket NO tiene datos de la vacante** (ni salarios, ni modalidad, ni ubicación), solo título, descripción y adjunto opcional para referencia.

**Paso 1: Employer Expresa Intención (Crea Ticket)**
- **Ruta Employer:** `/company/post-job` (formulario de ticket simplificado)
- **Acción:** Employer completa formulario simple que expresa su intención:
  - **Título del trabajo** (requerido) - solo referencia básica
  - **Descripción del puesto** (requerido, texto libre) - información de referencia
  - **Archivo adjunto** (opcional, puede subir PDF, DOC, etc. con información adicional de referencia)
  
- **Estado del Ticket:** `pending` → Se crea registro en `job_request_ticket`
- **⚠️ IMPORTANTE:** 
  - El ticket es **únicamente una solicitud/intención**, no contiene datos estructurados de la vacante
  - El employer **NO puede crear jobs directamente**, solo puede crear tickets
  - Todos los detalles de la vacante (salarios, modalidad, ubicación, requisitos, etc.) los completa el **admin** al crear el job real

**Paso 2: Admin Revisa Tickets Pendientes**
- **Ruta Admin:** `/admin/post-job` o nueva ruta `/admin/pending-tickets`
- **Acción:** Admin visualiza todos los tickets en estado `pending`
- **Funcionalidades:**
  - Lista de tickets pendientes
  - Vista detallada de cada ticket
  - Información del employer solicitante
  - Posibilidad de aprobar, rechazar o solicitar modificaciones

**Paso 3: Admin Crea el Job Real**
- **Ruta Admin:** `/admin/post-job` (con ticket como referencia)
- **Acción:** El admin es quien **crea el job completo** basándose en la intención expresada en el ticket:
  1. Admin revisa el título y descripción del ticket (solo para entender la intención)
  2. Si hay archivo adjunto, admin lo descarga/revisa como referencia adicional
  3. **Admin completa el formulario completo de creación de job** con **TODOS** los detalles de la vacante:
     - Título y descripción (puede usar/modificar los del ticket)
     - **Ubicación y tipo de ubicación** (onsite/remote/hybrid) - definido por admin
     - **Modalidad** (full_time, part_time, contract, etc.) - definido por admin
     - **Rango salarial** - definido por admin
     - **Número de vacantes** - definido por admin
     - **Requisitos y habilidades** - definido por admin
     - **Beneficios** - definido por admin
     - Fecha de publicación - definido por admin
     - Estado inicial del job (draft/open) - definido por admin
  4. Clic en "Crear Trabajo" → Se crea registro en `job` con **todos los detalles estructurados**
  5. Ticket cambia a estado `approved` y se vincula con el job creado
  6. Job queda disponible para publicación inmediata o programada

**⚠️ IMPORTANTE:** El employer nunca puede crear o publicar jobs directamente. Solo puede expresar su intención mediante tickets simples, y el admin es quien crea y gestiona todos los jobs reales del sistema.

**Paso 4: Employer Visualiza Sus Trabajos (Ya Creados por Admin)**
- **Ruta Employer:** `/company/my-jobs`
- **Vista:** Listado de todos los jobs que fueron creados por el admin a partir de los tickets del employer
- **Estados posibles del job:**
  - `draft` (creado por admin pero no publicado)
  - `open` (publicado y activo)
  - `paused` (pausado temporalmente)
  - `closed` (cerrado)

**Estados del Ticket:**
- `pending`: Esperando revisión del admin
- `under_review`: Admin está revisando el ticket
- `approved`: Ticket aprobado, job creado
- `rejected`: Ticket rechazado por el admin
- `needs_revision`: Admin solicita modificaciones al employer

---

### 3. Flujo de Búsqueda y Aplicación (Employee)

#### Búsqueda de Trabajos
**Ruta:** `/find-job`

1. Employee (o usuario público) accede a búsqueda
2. Filtros disponibles:
   - Búsqueda por palabra clave
   - Categorías de trabajos
   - Ubicación
   - Modalidad (full_time, part_time, remote, etc.)
   - Rango salarial
   - Nivel de experiencia
3. Resultados mostrados con información resumida
4. Click en trabajo → Detalle completo

#### Visualización de Detalle
**Ruta:** `/find-job/[id]`

1. Vista completa del trabajo:
   - Información del puesto
   - Detalles de la empresa
   - Requisitos y responsabilidades
   - Beneficios y condiciones
   - Ubicación y modalidad
2. Si está autenticado como employee → Botón "Aplicar"
3. Si no está autenticado → Redirección a login/registro

#### Aplicación a Trabajo
**Ruta:** `/find-job/[id]` (con autenticación)

1. Employee hace clic en "Aplicar a este trabajo"
2. Formulario de aplicación:
   - Carta de presentación (opcional)
   - URL del CV/Resume (opcional)
   - Confirmación de aplicación
3. Al enviar:
   - Se crea registro en `job_application` con estado `submitted`
   - Se registra paso inicial en `application_step`
   - Employer recibe notificación
   - Employee puede ver aplicación en `/employee/profile` → pestaña "Vacantes Aplicadas"

---

### 4. Flujo de Gestión de Aplicaciones (Employer)

#### Listado de Aplicantes
**Ruta:** `/company/applicants`

1. Employer accede a gestionar aplicantes
2. Vista de todas las aplicaciones a sus trabajos
3. Filtros:
   - Por trabajo específico
   - Por estado de aplicación
   - Por fecha de aplicación
   - Por rating/calificación
4. Vista de tarjetas con información resumida de cada candidato

#### Detalle del Aplicante
**Ruta:** `/company/applicants/[id]`

1. Employer visualiza perfil completo del candidato:
   - Información personal
   - Formación académica
   - Experiencia laboral
   - Habilidades
   - Carta de presentación y CV
2. Acciones disponibles:
   - Cambiar estado de aplicación:
     - `submitted` → `under_review`
     - `under_review` → `shortlisted`
     - `shortlisted` → `interview`
     - `interview` → `offered` o `rejected`
     - `offered` → `hired` o `rejected`
   - Agregar notas/comentarios
   - Asignar rating (1-5)
   - Programar entrevista
3. Cada cambio de estado se registra en `application_step` para auditoría

#### Ver Trabajos Publicados
**Ruta:** `/company/view-job/[id]`

1. Vista detallada del trabajo desde perspectiva del employer
2. Información mostrada:
   - Detalles del trabajo
   - Estadísticas:
     - Número de aplicaciones
     - Visualizaciones
     - Aplicantes por estado
3. Acciones:
   - Editar trabajo (si está en draft o paused)
   - Cambiar estado del job
   - Ver todos los aplicantes de este trabajo

---

### 5. Flujo de Gestión Administrativa

#### Gestión de Trabajos (Admin)
**Ruta:** `/admin/my-jobs`

1. Admin visualiza todos los trabajos del sistema
2. Puede filtrar por:
   - Employer
   - Estado del job
   - Fecha de creación
   - Fecha de publicación
3. Acciones:
   - Ver detalles
   - Editar cualquier trabajo
   - Cambiar estados
   - Eliminar trabajos (soft delete)

#### Gestión de Tickets Pendientes (Admin)
**Ruta Propuesta:** `/admin/pending-tickets`

1. Lista de todos los tickets pendientes
2. Vista de Kanban por estado:
   - `pending` (nuevos)
   - `under_review` (en revisión)
   - `needs_revision` (requiere cambios)
3. Acciones por ticket:
   - Ver detalles completos
   - Aprobar y crear job
   - Rechazar con motivo
   - Solicitar revisión al employer
4. Al aprobar → Redirección a formulario de creación de job con datos pre-cargados

#### Crear Trabajo (Admin)
**Ruta:** `/admin/post-job`

1. Formulario completo de creación de job
2. Puede crear desde cero o desde ticket aprobado
3. Campos disponibles:
   - Datos del empleador (desde ticket o selección manual)
   - Título y descripción
   - Requisitos y habilidades
   - Ubicación y modalidad
   - Rango salarial
   - Fecha de publicación
   - Estado inicial (draft o open)

#### Gestión de Aplicantes (Admin)
**Ruta:** `/admin/applicants`

1. Vista global de todas las aplicaciones
2. Puede ver aplicaciones de todos los employers
3. Funcionalidades similares a employer pero con alcance global
4. Puede reasignar aplicaciones si es necesario

---

### 6. Flujo de Perfil y Configuración

#### Perfil del Employee
**Ruta:** `/employee/profile`

**Pestañas disponibles:**
1. **Datos Personales**
   - Editar información básica
   - Actualizar contacto y ubicación
2. **Formación Académica**
   - Agregar/editar educación
   - Certificaciones y cursos
3. **Experiencia Laboral**
   - Historial de trabajos
   - Referencias
4. **Vacantes Aplicadas**
   - Lista de trabajos a los que aplicó
   - Estado de cada aplicación
   - Seguimiento del proceso
5. **Entrevistas Programadas**
   - Calendario de entrevistas
   - Recordatorios
6. **Habilidades**
   - Lista de skills técnicas y blandas
   - Niveles de competencia

#### Perfil del Employer/Company
**Ruta:** `/company/profile`

**Pestañas disponibles:**
1. **Datos de la Empresa**
   - Información corporativa
   - Logo y branding
   - Descripción de la empresa
2. **Dashboard**
   - Estadísticas de trabajos
   - Métricas de aplicaciones
   - Gráficos de rendimiento
3. **Kanban de Candidatos**
   - Vista visual del proceso de selección
   - Arrastrar candidatos entre estados
4. **Tickets de Solicitud**
   - Historial de tickets creados
   - Estado de cada ticket
   - Trabajos resultantes de tickets aprobados

#### Perfil del Admin
**Ruta:** `/admin/profile`

**Funcionalidades:**
1. Gestión de usuarios
2. Gestión de roles
3. Configuración del sistema
4. Estadísticas globales
5. Gestión de tickets

---

## 🔄 Diagrama de Flujo de Estados

### Estados de Ticket de Solicitud de Job
```
pending → under_review → approved (job creado)
                      ↓
                needs_revision → (employer modifica) → pending
                      ↓
                   rejected
```

### Estados de Job
```
draft → open → paused → closed
             ↓    ↑
             └────┘
```

### Estados de Aplicación
```
submitted → under_review → shortlisted → interview → offered → hired
                                                         ↓
                                                    rejected
                                                         ↓
                                                    withdrawn
```

---

## 📊 Páginas y Rutas Principales

### Páginas Públicas
- `/` - Página principal (landing)
- `/find-job` - Búsqueda de trabajos
- `/find-job/[id]` - Detalle de trabajo (público)
- `/blogs` - Listado de blogs
- `/blogs/[id]` - Detalle de blog
- `/partners` - Empresas socias
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios

### Páginas del Employee
- `/employee/profile` - Perfil del aspirante

### Páginas del Employer/Company
- `/company/profile` - Perfil de la empresa
- `/company/my-jobs` - Mis trabajos (ver solo, no crear)
- `/company/view-job/[id]` - Ver trabajo publicado
- `/company/applicants` - Aplicantes a mis trabajos
- `/company/applicants/[id]` - Detalle de aplicante

### Páginas del Admin
- `/admin/profile` - Panel administrativo
- `/admin/post-job` - Crear trabajo (desde ticket o manual)
- `/admin/my-jobs` - Gestión de todos los trabajos
- `/admin/view-job/[id]` - Ver/editar trabajo
- `/admin/edit-job/[id]` - Editar trabajo
- `/admin/applicants` - Gestión global de aplicantes
- `/admin/applicants/[id]` - Detalle de aplicante

---

## 🔐 Control de Acceso y Permisos

### Permisos por Rol

**Admin:**
- Crear, editar y eliminar cualquier job
- Ver y gestionar todos los tickets
- Ver todas las aplicaciones
- Gestionar usuarios y roles
- Configuración del sistema

**Employer/Company:**
- Crear tickets de solicitud de jobs
- Ver solo sus propios trabajos (creados desde sus tickets)
- Gestionar aplicantes de sus trabajos
- Ver y editar su perfil de empresa
- No puede crear jobs directamente
- No puede ver aplicaciones de otros employers

**Employee/Labour:**
- Aplicar a trabajos disponibles
- Ver y editar su perfil profesional
- Ver estado de sus aplicaciones
- No puede ver información de otros aplicantes
- No puede gestionar trabajos

**Público:**
- Buscar y ver trabajos publicados
- Ver blogs y contenido público
- No puede aplicar (debe registrarse)

---

## 📝 Notas de Implementación

### Cambios Principales del Nuevo Flujo

1. **Sistema de Tickets:**
   - Los employers ya NO crean jobs directamente
   - Deben crear un ticket de solicitud
   - El admin revisa, aprueba y crea el job
   - Esto permite control de calidad y moderación

2. **Separación de Funcionalidades:**
   - `/company/post-job` → Futuramente será formulario de ticket
   - `/admin/post-job` → Único lugar donde se crean jobs
   - Los jobs creados quedan asociados al employer que solicitó el ticket

3. **Auditoría Mejorada:**
   - Todos los cambios de estado se registran en `application_step`
   - Historial completo de tickets
   - Trazabilidad de quién creó/cambió qué

4. **Flexibilidad del Sistema:**
   - Admin puede crear jobs manualmente sin ticket
   - Admin puede ajustar información antes de crear el job
   - Employer mantiene visibilidad de sus solicitudes

---

*Documento actualizado con el nuevo flujo de tickets de solicitud de trabajos.*

