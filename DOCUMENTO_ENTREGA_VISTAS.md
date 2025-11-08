# Documento de Entrega - Vistas del Proyecto Tasqui Jobs

## Resumen del Proyecto
**Tasqui Jobs** es una plataforma de empleos desarrollada con Next.js que permite a aspirantes buscar trabajo y a empleadores publicar ofertas laborales. La aplicación incluye funcionalidades completas para ambos tipos de usuarios con un diseño moderno y responsivo.

**Total de páginas:** 14 páginas principales distribuidas en:
- 6 páginas públicas
- 1 página del aspirante  
- 7 páginas del empleador
sgi

---

## 📋 Índice de Vistas

### 🏠 **Páginas Públicas**
1. [Página Principal](#página-principal)
2. [Buscar Trabajos](#buscar-trabajos)
3. [Detalle de Trabajo](#detalle-de-trabajo)
4. [Blogs](#blogs)
5. [Detalle de Blog](#detalle-de-blog)
6. [Empresas Socias](#empresas-socias)

### 👤 **Páginas del Aspirante**
7. [Perfil del Aspirante](#perfil-del-aspirante)

### 🏢 **Páginas del Empleador**
8. [Perfil del Empleador](#perfil-del-empleador)
9. [Publicar Trabajo](#publicar-trabajo)
10. [Mis Trabajos](#mis-trabajos)
11. [Ver Trabajo (Empleador)](#ver-trabajo-empleador)
12. [Editar Trabajo](#editar-trabajo)
13. [Aplicantes](#aplicantes)
14. [Detalle del Aplicante](#detalle-del-aplicante)

---

## 🏠 Páginas Públicas

### Página Principal
**Ruta:** `/`  
**Archivo:** `src/app/page.tsx`

**Funcionalidad:**
- Landing page principal de la plataforma
- Hero section con llamada a la acción
- Barra de búsqueda de trabajos
- Sección de características principales
- Categorías de trabajos populares
- Listado de trabajos destacados
- Top empresas
- Estadísticas de la plataforma
- Testimonios de usuarios
- Sección de noticias/blog
- Call to action final

**Componentes utilizados:**
- `HeroSection`, `SearchBarSection`, `FeaturesSection`
- `CategorySection`, `JobsSection`, `TopCompaniesSection`
- `StatsSection`, `TestimonialsSection`, `NewsSection`
- `CallToActionSection`, `Footer`, `Sidebar`

---

### Buscar Trabajos
**Ruta:** `/find-job`  
**Archivo:** `src/app/find-job/page.tsx`

**Funcionalidad:**
- Página dedicada a la búsqueda de empleos
- Hero section específico para búsqueda
- Barra de búsqueda con categorías populares
- Sección de trabajos recomendados
- Notificaciones de trabajos
- Filtros avanzados de búsqueda

**Componentes utilizados:**
- `JobsHeroSection`, `SearchWithCategoriesSection`
- `JobsInterestedSection`, `JobNotificationsSection`

---

### Detalle de Trabajo
**Ruta:** `/find-job/[id]`  
**Archivo:** `src/app/find-job/[id]/page.tsx`

**Funcionalidad:**
- Vista detallada de una oferta de trabajo específica
- Información completa del puesto
- Detalles de la empresa
- Requisitos y responsabilidades
- Botón de aplicación
- Trabajos relacionados
- Compartir en redes sociales

**Componentes utilizados:**
- `JobDetailHeroSection`, `JobDetailMainSection`

---

### Blogs
**Ruta:** `/blogs`  
**Archivo:** `src/app/blogs/page.tsx`

**Funcionalidad:**
- Listado de artículos y blogs
- Hero section del blog
- Sección de blogs con filtros
- Categorías de contenido
- Búsqueda de artículos

**Componentes utilizados:**
- `BlogsHeroSection`, `BlogsSection`

---

### Detalle de Blog
**Ruta:** `/blogs/[id]`  
**Archivo:** `src/app/blogs/[id]/page.tsx`

**Funcionalidad:**
- Vista detallada de un artículo de blog
- Contenido completo del artículo
- Sección de comentarios
- Artículos relacionados
- Sidebar con contenido adicional

**Componentes utilizados:**
- `BlogDetailHeroSection`, `BlogDetailMainSection`

---

### Empresas Socias
**Ruta:** `/partners`  
**Archivo:** `src/app/partners/page.tsx`

**Funcionalidad:**
- Página de empresas socias/partners
- Hero section de empresas
- Listado de empresas destacadas
- Información sobre oportunidades de colaboración

**Componentes utilizados:**
- `CompaniesHeroSection`, `TopCompaniesSection`

---

## 👤 Páginas del Aspirante

### Perfil del Aspirante
**Ruta:** `/aspirante/profile`  
**Archivo:** `src/app/aspirante/profile/page.tsx`

**Funcionalidad:**
- Panel de control personal del aspirante
- Gestión completa del perfil profesional
- Sistema de pestañas para organizar información

**Secciones del perfil:**
1. **Datos Personales**
   - Información básica (nombre, email, teléfono)
   - Ubicación y datos de contacto
   - Edad y experiencia laboral
   - Información adicional

2. **Formación Académica**
   - Historial educativo
   - Certificaciones
   - Cursos y capacitaciones

3. **Experiencia Laboral**
   - Historial de trabajos anteriores
   - Referencias laborales
   - Logros y responsabilidades

4. **Vacantes Aplicadas**
   - Listado de trabajos a los que ha aplicado
   - Estado de las aplicaciones
   - Seguimiento del proceso

5. **Entrevistas Programadas**
   - Calendario de entrevistas
   - Recordatorios y notificaciones
   - Historial de entrevistas

**Componentes utilizados:**
- `ProfileHeroSection`, `ProfileMainSection`
- `DatosPersonales`, `FormacionAcademica`
- `ExperienciaLaboral`, `VacantesAplicadas`
- `EntrevistasProgramadas`

---

## 🏢 Páginas del Empleador

### Perfil del Empleador
**Ruta:** `/employer/profile`  
**Archivo:** `src/app/employer/profile/page.tsx`

**Funcionalidad:**
- Panel de control del empleador
- Gestión de perfil de empresa
- Dashboard con métricas y estadísticas

**Secciones del perfil:**
1. **Datos de la Empresa**
   - Información corporativa
   - Datos de contacto
   - Descripción de la empresa
   - Logo y branding

2. **Dashboard**
   - Estadísticas de trabajos publicados
   - Métricas de aplicaciones
   - Vista general de candidatos
   - Gráficos de rendimiento

3. **Kanban**
   - Gestión visual de candidatos
   - Estados de aplicación
   - Flujo de trabajo de reclutamiento

**Componentes utilizados:**
- `EmployerProfileHeroSection`, `EmployerProfileMainSection`

---

### Publicar Trabajo
**Ruta:** `/employer/post-job`  
**Archivo:** `src/app/employer/post-job/page.tsx`

**Funcionalidad:**
- Formulario para crear nuevas ofertas de trabajo
- Campos completos para descripción del puesto
- Configuración de requisitos y beneficios
- Publicación y gestión de ofertas

**Campos del formulario:**
- Título del trabajo
- Nombre de la empresa
- Sitio web de la empresa
- Tipo de trabajo (tiempo completo, medio tiempo, etc.)
- Rango salarial
- Categoría del trabajo
- Email de contacto
- Ubicación
- Etiquetas del trabajo
- Nivel de experiencia requerido
- Descripción detallada del puesto

**Componentes utilizados:**
- `PostJobHeroSection`, `PostJobFormSection`

---

### Mis Trabajos
**Ruta:** `/employer/my-jobs`  
**Archivo:** `src/app/employer/my-jobs/page.tsx`

**Funcionalidad:**
- Listado de todos los trabajos publicados por el empleador
- Gestión de estados (activo, pausado, cerrado)
- Estadísticas de cada trabajo
- Acciones rápidas (ver, editar, cambiar estado)

**Características:**
- Paginación de resultados
- Filtros por estado y categoría
- Vista de tarjetas con información resumida
- Acceso directo a edición y vista detallada
- Métricas de aplicaciones y visualizaciones

**Componentes utilizados:**
- `MyJobsHeroSection`, `MyJobsSection`

---

### Ver Trabajo (Empleador)
**Ruta:** `/employer/view-job/[id]`  
**Archivo:** `src/app/employer/view-job/[id]/page.tsx`

**Funcionalidad:**
- Vista detallada del trabajo desde la perspectiva del empleador
- Información completa de la oferta
- Estadísticas de aplicaciones
- Gestión de candidatos
- Opciones de edición y administración

**Componentes utilizados:**
- `EmployerJobDetailHeroSection`, `EmployerJobDetailMainSection`

---

### Editar Trabajo
**Ruta:** `/employer/edit-job/[id]`  
**Archivo:** `src/app/employer/edit-job/[id]/page.tsx`

**Funcionalidad:**
- Formulario de edición de trabajos existentes
- Pre-carga de datos actuales
- Actualización de información del puesto
- Guardado de cambios

**Componentes utilizados:**
- `EmployerEditJobHeroSection`, `EmployerEditJobFormSection`

---

### Aplicantes
**Ruta:** `/employer/applicants`  
**Archivo:** `src/app/employer/applicants/page.tsx`

**Funcionalidad:**
- Gestión de candidatos que han aplicado a los trabajos
- Filtros avanzados para búsqueda de candidatos
- Vista de perfiles de aspirantes
- Gestión del proceso de selección
- Comunicación con candidatos

**Características:**
- Filtros por trabajo, estado, fecha
- Vista de lista con información resumida
- Acceso a perfiles completos
- Gestión de estados de aplicación
- Sistema de notas y comentarios

**Componentes utilizados:**
- `ApplicantsHeroSection`, `ApplicantsSection`

---

### Detalle del Aplicante
**Ruta:** `/employer/applicants/[id]`  
**Archivo:** `src/app/employer/applicants/[id]/page.tsx`

**Funcionalidad:**
- Vista detallada de un candidato específico que ha aplicado a un trabajo
- Información completa del perfil del aspirante
- Evaluación y gestión del proceso de selección
- Comunicación directa con el candidato

**Secciones del detalle:**
1. **Información del Candidato**
   - Datos personales y de contacto
   - Foto de perfil
   - Estado de la aplicación
   - Fecha de aplicación

2. **Acerca de Mí**
   - Descripción personal del candidato
   - Objetivos profesionales
   - Motivación para el puesto

3. **Educación**
   - Historial académico
   - Certificaciones
   - Cursos relevantes

4. **Experiencia Laboral**
   - Trabajos anteriores
   - Responsabilidades y logros
   - Referencias laborales

5. **Habilidades**
   - Competencias técnicas
   - Habilidades blandas
   - Nivel de dominio

6. **Acciones**
   - Botones para contactar al candidato
   - Opciones de evaluación
   - Cambio de estado de la aplicación
   - Programación de entrevistas

**Componentes utilizados:**
- `ApplicantDetailHeroSection`, `ApplicantDetailMainSection`
- `ApplicantInfoCard`, `AboutMeCard`
- `EducationCard`, `ExperienceCard`
- `SkillsCard`, `ActionButtonsCard`

---

## 🎨 Características Técnicas

### Diseño y UX
- **Diseño responsivo** con Tailwind CSS
- **Tema oscuro/claro** implementado
- **Componentes reutilizables** y modulares
- **Navegación intuitiva** con breadcrumbs
- **Iconografía consistente** en toda la aplicación

### Funcionalidades Comunes
- **Sidebar de navegación** en todas las páginas
- **Footer y copyright** consistentes
- **Botón de scroll to top** para mejor UX
- **Sistema de colores** centralizado
- **Componentes de loading** y estados

### Estructura de Componentes
- **Componentes por sección** (home, employer, aspirante, jobs, blogs)
- **Componentes reutilizables** (cards, buttons, forms)
- **Hooks personalizados** para lógica de negocio
- **Tipos TypeScript** definidos para mejor desarrollo

---

## 📊 Métricas y Funcionalidades Avanzadas

### Para Aspirantes
- Seguimiento de aplicaciones
- Calendario de entrevistas
- Notificaciones de trabajos
- Perfil profesional completo
- Historial de actividad

### Para Empleadores
- Dashboard con métricas
- Gestión de candidatos
- Estadísticas de publicaciones
- Sistema de filtros avanzados
- Comunicación con aspirantes

---

## 🚀 Estado del Proyecto

**Estado:** En desarrollo activo  
**Framework:** Next.js 14 con TypeScript  
**Estilos:** Tailwind CSS  
**Componentes:** React con hooks  
**Navegación:** Next.js App Router  

### TODOs Identificados
- Implementación de parámetros dinámicos en páginas de detalle
- Conexión con base de datos
- Sistema de autenticación
- Funcionalidades de búsqueda avanzada
- Sistema de notificaciones en tiempo real

---

*Documento generado automáticamente basado en el análisis del código fuente del proyecto Tasqui Jobs.*
