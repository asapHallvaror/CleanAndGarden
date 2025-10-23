# 🗺️ DIAGRAMA VISUAL DEL PROYECTO - CLEAN & GARDEN

**Mapas mentales y diagramas para entender la estructura**

---

## 📊 Relaciones de Base de Datos

```
┌─────────────────┐
│      ROL        │
│─────────────────│
│ • id            │
│ • codigo        │
│ • nombre        │
└────────┬────────┘
         │ 1:N
         │
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO                                  │
│─────────────────────────────────────────────────────────────│
│ • id (PK)                                                   │
│ • nombre, apellido                                          │
│ • email (UNIQUE)                                            │
│ • telefono                                                  │
│ • contrasena_hash                                           │
│ • activo (bool) - Requiere confirmar email                │
│ • rol_id (FK)                                               │
│ • fecha_creacion, fecha_actualizacion                       │
└─────────────────────────────────────────────────────────────┘
         │                │                │
         │ 1:N            │ 1:N            │ 1:N
         │                │                │
    ┌────▼────┐    ┌──────▼────┐    ┌─────▼──────┐
    │  CITA   │    │ JARDIN    │    │ MENSAJE   │
    └─────────┘    └───────────┘    └───────────┘
         │
         │ 1:1
         ▼
    ┌──────────┐
    │  PAGO    │
    └──────────┘
         │
         │ 1:1
         ▼
    ┌──────────┐
    │ VISITA   │
    └──────────┘
```

---

## 🔐 Flujo de Autenticación

```
┌──────────────────┐
│  USUARIO NUEVO   │
└─────────┬────────┘
          │
          │ 1. POST /register
          ▼
┌──────────────────────────────────────┐
│ Backend:                             │
│ • Valida email único                 │
│ • Hash contraseña con bcrypt         │
│ • Genera token confirmación          │
│ • Crea usuario con activo=false      │
│ • Envía email con token              │
└─────────┬────────────────────────────┘
          │
          │ Email recibido
          ▼
┌──────────────────────────────────┐
│ Usuario abre link confirmación    │
│ GET /confirm-email?token=xxx      │
└─────────┬────────────────────────┘
          │
          │ 2. Backend valida token
          ▼
┌──────────────────────────┐
│ • Token válido?          │
│ • No expirado?           │
│ • Usuario existe?        │
└─────────┬────────────────┘
          │
      ┌───┴───┐
      │       │
   SÍ │       │ NO
      ▼       ▼
┌──────────┐  Error
│ SET      │  400
│ activo   │
│ = true   │
└────┬─────┘
     │
     │ 3. Usuario puede hacer login
     ▼
┌──────────────────────────┐
│  POST /login             │
│  • email, password       │
└────────┬─────────────────┘
         │
         │ Backend verifica:
         ▼
     ┌───────┐
     │Existe?│ NO → Error 401
     └───┬───┘
         │ SÍ
         │
     ┌───────────┐
     │Contraseña?│ NO → Error 401
     │correcta?  │
     └───┬───────┘
         │ SÍ
         │
    ┌────▼──────────────────┐
    │ Genera JWT válido 1h  │
    │ Guardado en cookie    │
    │ httpOnly = true       │
    └────┬─────────────────┘
         │
         ▼
┌────────────────────────────┐
│ ✅ USUARIO AUTENTICADO     │
│ • Cookie con token         │
│ • Acceso a rutas protegidas│
└────────────────────────────┘
```

---

## 🔄 Flujo de Reserva de Cita

```
┌─────────────────────────────────────┐
│ CLIENTE AUTENTICADO EN /chat        │
└────────────┬────────────────────────┘
             │
             │ 1. Ver servicios disponibles
             ▼
     ┌──────────────────┐
     │ GET /servicio    │
     │ Responde lista   │
     └──────────────────┘
             │
             │ 2. Selecciona: Servicio + Jardin + Fecha
             ▼
     ┌──────────────────────────────────┐
     │ POST /cita                       │
     │ {                                │
     │   cliente_id,                    │
     │   servicio_id,                   │
     │   jardin_id,                     │
     │   fecha_hora,                    │
     │   duracion_minutos               │
     │ }                                │
     └────────┬─────────────────────────┘
              │
              │ Backend:
              ▼
     ┌──────────────────────────┐
     │ • Valida datos           │
     │ • Crea cita              │
     │ • estado = "pendiente"   │
     │ • Busca técnico asignado │
     │ • Notifica al técnico    │
     └────────┬─────────────────┘
              │
              │ 3. TÉCNICO RECIBE NOTIFICACIÓN
              ▼
     ┌──────────────────────────┐
     │ Técnico ve cita          │
     │ Puede aceptar o rechazar │
     └────────┬─────────────────┘
              │
          ┌───┴────┐
          │        │
       Acepta  Rechaza
          │        │
    ┌─────▼──┐   └─► Error → Cliente ve "Rechazada"
    │ PUT    │
    │ /cita  │
    │ estado=│
    │confirm │
    └────┬───┘
         │
         │ 4. CLIENTE VE CONFIRMACIÓN
         ▼
┌──────────────────────────────────────┐
│ ✅ CITA CONFIRMADA                   │
│ • Cliente puede pagar                │
│ • Técnico ve detalles                │
│ • Se envía recordatorio 24h antes    │
└──────────────────────────────────────┘
```

---

## 💳 Flujo de Pago

```
┌──────────────────────────────────────┐
│ CLIENTE EN CITA CONFIRMADA           │
│ Debe pagar antes del servicio        │
└────────┬─────────────────────────────┘
         │
         │ 1. Selecciona método
         ▼
     ┌─────────────┬─────────────┐
     │ FLOW        │ TRANSFERENCIA│
     └─────┬───────┴──────┬──────┘
           │              │
           │              │ Sube comprobante
           │              ▼
           │        ┌──────────────────┐
           │        │ POST /pago       │
           │        │ metodo:          │
           │        │ transferencia    │
           │        └────────┬─────────┘
           │                 │
           │                 │ 3. Admin recibe
           │                 ▼
           │        ┌──────────────────┐
           │        │ Admin dashboard  │
           │        │ Valida tranfer   │
           │        │ PUT /pago/validate
           │        └────────┬─────────┘
           │                 │
           │                 ▼
           │        ┌──────────────────┐
           │        │ Estado aprobado  │
           │        └──────────────────┘
           │
           │ 2. POST /pago (flow)
           ▼
    ┌──────────────────────────┐
    │ Backend genera orden Flow│
    │ Usuario redirigido a     │
    │ Pasarela Flow            │
    └────┬─────────────────────┘
         │
         │ 3. Usuario paga en Flow
         ▼
    ┌──────────────────────────┐
    │ Flow procesa pago        │
    │ Notifica a backend       │
    │ POST /webhook/flow       │
    └────┬─────────────────────┘
         │
         ▼
    ┌──────────────────────────┐
    │ Backend actualiza estado │
    │ pago.estado = aprobado   │
    │ Notifica al cliente      │
    └────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ ✅ PAGO APROBADO                     │
│ • Cliente recibe confirmación        │
│ • Técnico notificado                 │
│ • Cita lista para ejecutarse         │
└──────────────────────────────────────┘
```

---

## 📋 Estructura de Carpetas Frontend

```
web/src/
│
├── app/
│   ├── layout.tsx              ← Layout global
│   ├── globals.css             ← Estilos globales
│   ├── page.tsx                ← Landing page /
│   │
│   ├── login/                  ← /login
│   │   └── page.tsx
│   ├── register/               ← /register
│   │   └── page.tsx
│   ├── profile/                ← /profile (protegida)
│   │   └── page.tsx
│   │
│   ├── chat/                   ← /chat
│   │   └── page.tsx
│   ├── mensajes/               ← /mensajes
│   │   ├── page.tsx
│   │   ├── nueva/
│   │   │   └── page.tsx        ← /mensajes/nueva
│   │   └── [id]/
│   │       └── page.tsx        ← /mensajes/:id
│   │
│   ├── portfolio/              ← /portfolio
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx        ← /portfolio/:id
│   │
│   ├── our-services/           ← /our-services
│   │   └── page.tsx
│   ├── about-us/               ← /about-us
│   │   └── page.tsx
│   │
│   ├── confirm-email/          ← /confirm-email
│   │   └── page.tsx
│   ├── forgot-password/        ← /forgot-password
│   │   └── page.tsx
│   ├── reset-password/         ← /reset-password
│   │   └── page.tsx
│   ├── change-password/        ← /change-password
│   │   └── page.tsx
│   │
│   └── components/             ← Componentes propios de página
│       ├── Navbar.tsx          ← Barra de navegación
│       ├── about-us/
│       │   ├── AboutUsHero.tsx
│       │   ├── OurTeam.tsx
│       │   └── CallToAction.tsx
│       ├── landing/
│       │   ├── Hero.tsx
│       │   ├── Services.tsx
│       │   ├── LatestJobs.tsx
│       │   └── Location.tsx
│       ├── chat/
│       │   ├── chat-message.tsx
│       │   └── realtime-chat.tsx
│       └── portfolio/
│           ├── PortfolioCard.tsx
│           └── PortfolioList.tsx
│
├── components/                 ← Componentes reutilizables
│   ├── chat-message.tsx
│   ├── realtime-chat.tsx
│   └── ui/
│       ├── button.tsx
│       └── input.tsx
│
├── hooks/                      ← Hooks personalizados
│   ├── use-chat-scroll.tsx
│   └── use-realtime-chat.tsx
│
└── lib/
    ├── client.ts               ← Cliente HTTP (fetch)
    ├── server.ts               ← Funciones servidor (RSC)
    ├── middleware.ts           ← Middleware de seguridad
    └── utils.ts                ← Utilidades
```

---

## 🏗️ Estructura de Carpetas Backend

```
backend/src/
│
├── server.ts                   ← ARCHIVO PRINCIPAL (1342 líneas)
│   │
│   ├── Imports
│   ├── Configuración Express
│   ├── Middleware
│   ├── Helpers (toJSONSafe, JWT)
│   ├── Health check
│   │
│   ├── USUARIOS
│   │   ├── GET /usuario
│   │   ├── POST /register
│   │   ├── POST /login
│   │   ├── GET /confirm-email
│   │   ├── GET /profile (protegido)
│   │   ├── POST /forgot-password
│   │   ├── POST /reset-password
│   │   ├── POST /change-password (protegido)
│   │   └── GET /logout
│   │
│   ├── CITAS
│   │   ├── GET /cita
│   │   ├── POST /cita
│   │   ├── GET /cita/:id
│   │   ├── PUT /cita/:id
│   │   └── DELETE /cita/:id
│   │
│   ├── SERVICIOS
│   │   ├── GET /servicio
│   │   ├── POST /servicio (admin)
│   │   ├── PUT /servicio/:id (admin)
│   │   └── DELETE /servicio/:id (admin)
│   │
│   ├── PAGOS
│   │   ├── GET /pago
│   │   ├── POST /pago
│   │   ├── PUT /pago/:id/validate (admin)
│   │   └── POST /webhook/flow
│   │
│   ├── MENSAJES
│   │   ├── GET /conversacion
│   │   ├── POST /conversacion
│   │   ├── POST /mensaje
│   │   └── GET /mensaje/:conversacionId
│   │
│   ├── JARDINES
│   │   ├── GET /jardin
│   │   ├── POST /jardin
│   │   ├── PUT /jardin/:id
│   │   └── DELETE /jardin/:id
│   │
│   └── PORTAFOLIO
│       ├── GET /portafolio
│       ├── POST /portafolio (protegido)
│       ├── PUT /portafolio/:id (protegido)
│       └── DELETE /portafolio/:id (protegido)
│
└── lib/
    ├── prisma.ts               ← Instancia única de Prisma
    ├── mailer.ts               ← Configuración Nodemailer
    ├── middleware.ts           ← Middlewares reutilizables
    ├── server.ts               ← Utilidades servidor
    └── utils.ts                ← Funciones helper
```

---

## 🎯 Flujo de Mensajería en Tiempo Real

```
┌────────────────────────────┐
│ USUARIO A autenticado      │
│ Abre /chat o /mensajes     │
└────────┬───────────────────┘
         │
         │ 1. GET /conversacion
         ▼
    ┌─────────────────────────────┐
    │ Backend retorna lista       │
    │ de conversaciones del user  │
    └────────┬────────────────────┘
             │
             │ 2. Usuario A selecciona conversación
             ▼
        ┌──────────────────────────┐
        │ GET /mensaje/:conversacionId
        │ Carga últimos 20 mensajes│
        └────────┬─────────────────┘
                 │
                 │ 3. Usuario A escribe y envía
                 ▼
            ┌────────────────────┐
            │ POST /mensaje      │
            │ {                  │
            │   conversacion_id  │
            │   cuerpo: "Hola"   │
            │ }                  │
            └────────┬───────────┘
                     │
                     │ Backend:
                     ▼
            ┌────────────────────┐
            │ • Crea mensaje     │
            │ • Marca usuario A  │
            │   como "leído"     │
            │ • NOTIFICA USER B  │
            │   (en tiempo real) │
            └────────┬───────────┘
                     │
                     ▼ (Real-time, ej: Socket.io o SSE)
            ┌────────────────────┐
            │ USER B:            │
            │ ✅ Nuevo mensaje   │
            │ recibido           │
            └────────────────────┘
```

---

## 📊 Estados de Cita

```
Creada
  │
  ├─► PENDIENTE (usuario A puede cancelar)
  │     │
  │     ├─► CONFIRMADA (técnico aceptó)
  │     │     │
  │     │     ├─► REALIZADA (se completó)
  │     │     │
  │     │     └─► CANCELADA (durante ejecución)
  │     │
  │     └─► CANCELADA (técnico rechazó)
  │
  └─► CANCELADA (cliente canceló)
```

---

## 💾 Estados de Pago

```
Creado
  │
  └─► PENDIENTE
       │
       ├─► APROBADO ✅
       │
       ├─► RECHAZADO ❌
       │
       ├─► FALLIDO ❌
       │
       └─► ANULADO ❌
```

---

## 🔐 Permisos por Rol

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTE                          │
├─────────────────────────────────────────────────────┤
│ ✅ Ver perfil                                       │
│ ✅ Ver servicios disponibles                        │
│ ✅ Crear jardines                                   │
│ ✅ Crear citas                                      │
│ ✅ Pagar citas                                      │
│ ✅ Ver portafolio público                           │
│ ✅ Chatear con técnicos                             │
│ ❌ Crear servicios                                  │
│ ❌ Ver citas de otros clientes                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                   TÉCNICO                           │
├─────────────────────────────────────────────────────┤
│ ✅ Ver perfil                                       │
│ ✅ Ver citas asignadas                              │
│ ✅ Aceptar/rechazar citas                           │
│ ✅ Reportar visita completada                       │
│ ✅ Crear portafolio                                 │
│ ✅ Chatear con clientes                             │
│ ❌ Ver citas de otros técnicos                      │
│ ❌ Crear servicios                                  │
│ ❌ Validar pagos                                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  ADMINISTRADOR                      │
├─────────────────────────────────────────────────────┤
│ ✅ VER TODO                                         │
│ ✅ Editar servicios                                 │
│ ✅ Validar pagos                                    │
│ ✅ Gestionar usuarios                               │
│ ✅ Ver reportes                                     │
│ ✅ Crear roles                                      │
│ ✅ Acceso a Prisma Studio                           │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida de un Usuario

```
1. VISITANTE
   └─► Ve landing page
       └─► Puede leer servicios
           └─► Puede leer portafolio

2. SE REGISTRA
   └─► POST /register
       └─► Email enviado con token
           └─► Usuario creado (activo=false)

3. CONFIRMA EMAIL
   └─► GET /confirm-email?token=xxx
       └─► Usuario activo=true
           └─► Puede hacer login

4. INICIA SESIÓN
   └─► POST /login
       └─► JWT generado
           └─► Cookie establecida
               └─► Acceso a rutas protegidas

5. USA LA APP
   ├─► Como CLIENTE: Reserva citas, paga, chatea
   ├─► Como TÉCNICO: Ve citas, reporta visitas
   └─► Como ADMIN: Gestiona todo

6. OLVIDA CONTRASEÑA
   ├─► POST /forgot-password
   ├─► Email con token
   ├─► POST /reset-password
   └─► Nueva contraseña establecida

7. CAMBIA CONTRASEÑA (autenticado)
   └─► POST /change-password
       └─► Contraseña actualizada
           └─► Debe volver a login

8. CIERRA SESIÓN
   └─► GET /logout
       └─► Cookie eliminada
           └─► Redirige a login
```

---

## 📱 Resolución Responsive

```
┌─────────────────────────────────────────────────────┐
│ Next.js App Router                                  │
│ (Con Tailwind CSS)                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Mobile:      0px - 640px    (sm)                    │
│ Tablet:    640px - 1024px   (md, lg)                │
│ Desktop: 1024px+            (xl, 2xl)               │
│                                                     │
│ Todos los componentes son responsive por defecto   │
│ (DaisyUI + Tailwind)                                │
└─────────────────────────────────────────────────────┘
```

---

**Versión:** 1.0  
**Última actualización:** 15 de Octubre 2025

