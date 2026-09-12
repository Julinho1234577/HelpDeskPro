# HelpDeskPro - Requisitos del Sistema

## 1. Descripción

HelpDeskPro es una plataforma web para la gestión de incidencias y solicitudes de soporte TI dentro de una organización.

El sistema permitirá registrar, clasificar, asignar, atender, resolver y cerrar tickets de soporte, manteniendo un historial de las acciones realizadas.

## 2. Objetivo

Centralizar la gestión de incidencias TI y permitir el seguimiento de cada solicitud desde su creación hasta su cierre.

## 3. Usuarios del sistema

### Administrador

Gestiona usuarios, técnicos, categorías, prioridades y tickets.

### Técnico

Atiende los tickets asignados, registra diagnósticos, soluciones y actualiza el estado de las incidencias.

### Usuario

Registra incidencias, consulta su estado, agrega comentarios y confirma la solución.

## 4. Requisitos funcionales

### RF-001 - Autenticación

El sistema debe permitir iniciar sesión mediante correo electrónico y contraseña.

### RF-002 - Autorización

El sistema debe controlar el acceso a las funcionalidades según el rol del usuario.

### RF-003 - Gestión de usuarios

El administrador debe poder registrar, consultar, modificar y desactivar usuarios.

### RF-004 - Gestión de categorías

El administrador debe poder gestionar las categorías de tickets.

### RF-005 - Gestión de prioridades

El sistema debe manejar prioridades Baja, Media, Alta y Crítica.

### RF-006 - Registro de tickets

Los usuarios deben poder registrar nuevas incidencias.

### RF-007 - Consulta de tickets

Los usuarios deben poder consultar sus tickets y su estado actual.

### RF-008 - Asignación de tickets

El administrador debe poder asignar tickets a técnicos.

### RF-009 - Actualización de tickets

Los técnicos deben poder actualizar el estado y la información de los tickets asignados.

### RF-010 - Comentarios

Los usuarios y técnicos deben poder agregar comentarios a los tickets.

### RF-011 - Historial

El sistema debe registrar las principales acciones realizadas sobre cada ticket.

### RF-012 - Resolución

El técnico debe poder registrar la solución aplicada a una incidencia.

### RF-013 - Cierre

El usuario debe poder confirmar la solución y cerrar el ticket.

### RF-014 - Dashboard

El administrador debe poder consultar indicadores relacionados con las incidencias.

### RF-015 - Auditoría

El sistema debe registrar operaciones relevantes realizadas por los usuarios.

## 5. Requisitos no funcionales

### RNF-001 - Seguridad

Las contraseñas deben almacenarse utilizando mecanismos de hash seguros.

### RNF-002 - Rendimiento

Las consultas de tickets deben utilizar paginación cuando el volumen de información sea elevado.

### RNF-003 - Disponibilidad

La API debe manejar errores de forma controlada y devolver respuestas HTTP apropiadas.

### RNF-004 - Mantenibilidad

El código debe organizarse utilizando separación de responsabilidades y arquitectura por capas.

### RNF-005 - Usabilidad

La interfaz debe ser responsive y permitir una navegación clara.

### RNF-006 - Trazabilidad

Las operaciones relevantes sobre los tickets deben quedar registradas en el historial.

## 6. Tecnologías

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- React
- Vite
- JWT
- xUnit
- Postman
- Git
- Docker

## 7. Alcance

La primera versión incluirá autenticación, gestión de usuarios, gestión de tickets, asignación de técnicos, comentarios, historial, dashboard y pruebas funcionales.

Las funcionalidades adicionales podrán incorporarse en futuras versiones.