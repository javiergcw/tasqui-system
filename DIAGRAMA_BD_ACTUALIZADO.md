# Diagrama de Base de Datos - Tasqui Jobs (Actualizado)

## Descripción
Diagrama actualizado de la base de datos que incluye el nuevo sistema de tickets de solicitud de trabajos, donde los employers solicitan jobs mediante tickets que son aprobados y gestionados por admins.

---

## Diagrama Completo

```sql
// catálogo flexible de roles (futuro-proof)
Table user_role {
  id           uuid [pk]
  key          varchar(32) [not null, unique]
  name         varchar(80)  [not null]
  description  text
  is_default   bool [not null, default: false]
  created_at   timestamptz [not null]
}

Table app_user_role {
  id         uuid [pk]
  user_id    uuid [not null, ref: > app_user.id]
  role_id    uuid [not null, ref: > user_role.id]
  created_at timestamptz [not null]
  indexes {
    (user_id, role_id) [unique]
  }
}

Table app_user {
  id         uuid [pk]
  email      varchar(254) [not null, unique]
  password   varchar(200) [not null]
  full_name  varchar(160) [not null]
  created_at timestamptz [not null]
}

Table employer_profile {
  id            uuid [pk]
  user_id       uuid [not null, unique, ref: > app_user.id]
  business_name varchar(200) [not null]
  tax_id        varchar(50)
  website       varchar(255)
  created_at    timestamptz [not null]
}

Table labour_profile {
  id         uuid [pk]
  user_id    uuid [not null, unique, ref: > app_user.id]
  city       varchar(100)
  headline   varchar(160)
  summary    text
  created_at timestamptz [not null]
}

Enum job_request_status {
  pending                    // esperando revisión
  under_review               // admin está revisando
  approved                   // aprobado, job creado
  rejected                   // rechazado por admin
  needs_revision             // requiere modificaciones del employer
  cancelled                  // cancelado por employer
}

// nuevo: tickets de solicitud de trabajos (employer → admin)
// ticket simplificado: solo título, descripción y archivo opcional
Table job_request_ticket {
  id                uuid [pk]
  employer_id       uuid [not null, ref: > employer_profile.id]
  title             varchar(200) [not null]
  description       text [not null]
  attachment_url    varchar(500)                 // archivo opcional (PDF, DOC, etc.)
  status            job_request_status [not null, default: 'pending']
  rejection_reason  text                        // motivo si fue rechazado
  revision_notes    text                        // notas del admin si necesita revisión
  requested_at      timestamptz [not null]      // cuando el employer creó el ticket
  reviewed_by       uuid [ref: > app_user.id]   // admin que revisó/aprobó
  reviewed_at       timestamptz                 // cuando fue revisado
  created_at        timestamptz [not null]
  updated_at        timestamptz [not null]
  
  indexes {
    (employer_id, status)
    (status)
    (requested_at)
    (reviewed_by)
  }
}

Enum job_status {
  draft
  open
  paused
  closed
}

Enum job_modality {
  full_time
  part_time
  contract
  temporary
  internship
  freelance
}

Table job {
  id               uuid [pk]
  employer_id      uuid [not null, ref: > employer_profile.id]
  ticket_id        uuid [ref: > job_request_ticket.id]  // nuevo: origen del job
  created_by_admin uuid [ref: > app_user.id]            // nuevo: admin que creó el job
  title            varchar(200) [not null]
  description      text [not null]
  location_city    varchar(100)
  location_country varchar(2)                 // ISO-3166-1
  location_type    varchar(10) [not null, default: 'onsite'] // onsite|remote|hybrid
  modality         job_modality [not null, default: 'full_time']
  salary_min       numeric(14,2)
  salary_max       numeric(14,2)
  currency_code    varchar(3)                 // ISO-4217
  openings         int [not null, default: 1]
  status           job_status [not null, default: 'open']
  published_at     timestamptz
  closing_date     timestamptz
  created_at       timestamptz [not null]
  updated_at       timestamptz [not null]

  indexes {
    (employer_id, status)
    (ticket_id)                               // nuevo
    (created_by_admin)                        // nuevo
    (published_at)
    (closing_date)
  }
}

Enum application_status {
  submitted
  under_review
  shortlisted
  interview
  offered
  hired
  rejected
  withdrawn
}

Table job_application {
  id             uuid [pk]
  job_id         uuid [not null, ref: > job.id]
  labour_id      uuid [not null, ref: > labour_profile.id]
  cover_letter   text
  resume_url     varchar(500)
  status         application_status [not null, default: 'submitted']
  rating         int                                         // 1..5 opcional
  handled_by     uuid [ref: > employer_profile.id]           // quién gestiona
  notes          text
  applied_at     timestamptz [not null]
  updated_at     timestamptz [not null]

  indexes {
    (job_id, labour_id) [unique]                             // 1 vez por job
    (status)
    (applied_at)
    (handled_by)
  }
}

Table application_step {
  id               uuid [pk]
  application_id   uuid [not null, ref: > job_application.id]
  status_from      application_status
  status_to        application_status [not null]
  changed_by       uuid [ref: > employer_profile.id]         // null = sistema
  changed_at       timestamptz [not null]
  comment          text

  indexes {
    (application_id, changed_at)
  }
}

// nuevo: historial de cambios de estado de tickets (auditoría)
Table ticket_status_history {
  id               uuid [pk]
  ticket_id        uuid [not null, ref: > job_request_ticket.id]
  status_from      job_request_status
  status_to        job_request_status [not null]
  changed_by       uuid [ref: > app_user.id]                 // admin que cambió
  changed_at       timestamptz [not null]
  comment          text                                      // motivo del cambio
  
  indexes {
    (ticket_id, changed_at)
  }
}

// nuevo: comentarios/conversación entre admin y employer sobre un ticket
Table ticket_comment {
  id               uuid [pk]
  ticket_id        uuid [not null, ref: > job_request_ticket.id]
  author_id        uuid [not null, ref: > app_user.id]       // admin o employer
  author_type      varchar(10) [not null]                    // 'admin' | 'employer'
  comment          text [not null]
  created_at       timestamptz [not null]
  
  indexes {
    (ticket_id, created_at)
  }
}
```

---

## Descripción de Tablas Nuevas

### job_request_ticket
**Propósito:** Permite a los employers expresar su **intención de crear una vacante** mediante una solicitud muy simple que es revisada y procesada por admins.

**⚠️ IMPORTANTE:** El ticket es **únicamente una solicitud/intención**, NO contiene datos de la vacante. El employer solo expresa que necesita crear un trabajo, y el admin es quien crea el job real con todos los detalles.

**Campos del ticket (solo intención - sin datos de vacante):**
- `title`: Título del trabajo solicitado (referencia básica)
- `description`: Descripción del puesto (texto libre, información de referencia)
- `attachment_url`: URL del archivo adjunto opcional (puede contener información adicional como referencia)

**Campos de gestión:**
- `employer_id`: Employer que solicita el trabajo
- `status`: Estado del ticket (pending, under_review, approved, rejected, needs_revision, cancelled)
- `reviewed_by`: Admin que revisó/aprobó el ticket
- `rejection_reason`: Motivo si fue rechazado
- `revision_notes`: Notas del admin si requiere cambios

**Lo que NO tiene el ticket (por diseño):**
- ❌ No tiene salarios
- ❌ No tiene modalidad (full_time, part_time, etc.)
- ❌ No tiene ubicación
- ❌ No tiene requisitos estructurados
- ❌ No tiene número de vacantes
- ✅ Solo título, descripción y adjunto opcional para que el admin entienda la intención y cree el job completo

**Estados:**
- `pending`: Recién creado, esperando revisión
- `under_review`: Admin está revisando el ticket
- `approved`: Aprobado y job creado
- `rejected`: Rechazado por el admin
- `needs_revision`: Requiere modificaciones del employer
- `cancelled`: Cancelado por el employer

**Relaciones:**
- Un ticket pertenece a un `employer_profile`
- Un ticket puede generar un `job` (cuando es aprobado)
- Un ticket es revisado por un `app_user` (admin)

### ticket_status_history
**Propósito:** Auditoría de todos los cambios de estado de los tickets.

**Funcionalidad:**
- Registra cada transición de estado
- Almacena quién hizo el cambio y cuándo
- Permite comentarios sobre el cambio

### ticket_comment
**Propósito:** Sistema de comentarios/conversación entre admin y employer sobre un ticket específico.

**Funcionalidad:**
- Permite comunicación bidireccional
- Employer puede hacer preguntas
- Admin puede solicitar aclaraciones
- Historial completo de conversación

---

## Cambios en Tablas Existentes

### job (modificada)
**Nuevos campos:**
- `ticket_id`: Referencia al ticket que originó este job (nullable, puede crearse manualmente)
- `created_by_admin`: Admin que creó el job

**Lógica:**
- Si `ticket_id` es null → Job creado manualmente por admin (sin ticket previo)
- Si `ticket_id` tiene valor → Job creado por admin a partir de un ticket aprobado del employer

**⚠️ Importante:** El admin es el único que puede crear jobs. El employer solo puede crear tickets (solicitudes simples), nunca jobs directamente.

---

## Flujo de Datos con Tickets

### Flujo Completo

1. **Employer crea ticket:**
   ```sql
   INSERT INTO job_request_ticket (
     employer_id, title, description, attachment_url, status, requested_at
   ) VALUES (...);
   ```
   
   Nota: `attachment_url` es opcional, puede ser NULL

2. **Admin revisa ticket:**
   ```sql
   UPDATE job_request_ticket 
   SET status = 'under_review', 
       reviewed_by = [admin_id]
   WHERE id = [ticket_id];
   ```

3. **Admin aprueba y crea job:**
   ```sql
   -- Crear job
   INSERT INTO job (
     employer_id, ticket_id, created_by_admin, title, ...
   ) VALUES (...);
   
   -- Actualizar ticket
   UPDATE job_request_ticket
   SET status = 'approved',
       reviewed_by = [admin_id],
       reviewed_at = NOW()
   WHERE id = [ticket_id];
   
   -- Registrar historial
   INSERT INTO ticket_status_history (...)
   ```

4. **Employer visualiza:**
   ```sql
   SELECT j.*, jrt.title as original_request_title
   FROM job j
   LEFT JOIN job_request_ticket jrt ON j.ticket_id = jrt.id
   WHERE j.employer_id = [employer_id];
   ```

---

## Índices Recomendados

### Para Performance
- `job_request_ticket(status, requested_at)` - Listado de tickets pendientes
- `job_request_ticket(employer_id, status)` - Tickets de un employer
- `job(ticket_id)` - Relación ticket → job
- `job_request_ticket(reviewed_by)` - Tickets revisados por un admin

### Para Consultas Comunes
- Tickets pendientes de revisión
- Tickets de un employer específico
- Jobs creados desde tickets
- Historial de cambios de estado

---

## Consideraciones de Implementación

### Validaciones
1. Un employer solo puede modificar tickets en estado `needs_revision` o `pending`
2. Solo admins pueden cambiar estados de tickets (excepto employer puede cancelar)
3. Un ticket aprobado no puede cambiar de estado
4. Un job solo puede tener un ticket_id asociado

### Integridad Referencial
- Si se elimina un ticket aprobado, el job asociado puede mantenerse (ticket_id nullable)
- Los comentarios y historial se mantienen aunque el ticket cambie de estado
- Un job puede existir sin ticket_id (creación manual por admin)

### Escalabilidad
- Los índices permiten búsquedas rápidas de tickets pendientes
- El historial de estados permite auditoría completa
- Los comentarios permiten comunicación asíncrona

---

*Diagrama actualizado con el sistema de tickets de solicitud de trabajos.*

