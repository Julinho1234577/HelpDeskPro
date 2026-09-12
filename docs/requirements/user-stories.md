# HelpDeskPro - Historias de Usuario

## Épica 1 - Autenticación y seguridad

### US-001 - Iniciar sesión

**Como** usuario del sistema  
**Quiero** iniciar sesión con mi correo y contraseña  
**Para** acceder a las funcionalidades correspondientes a mi rol.

**Criterios de aceptación:**

- El usuario debe ingresar correo y contraseña.
- Las credenciales deben validarse.
- Si son correctas, el sistema debe generar una sesión autenticada.
- Si son incorrectas, debe mostrarse un mensaje de error.
- El usuario debe ser redirigido al dashboard correspondiente.

---

### US-002 - Control de acceso

**Como** administrador  
**Quiero** controlar los permisos según el rol  
**Para** evitar que los usuarios accedan a funcionalidades no autorizadas.

**Criterios de aceptación:**

- Un administrador puede acceder a todas las funcionalidades administrativas.
- Un técnico puede acceder a sus tickets asignados.
- Un usuario puede acceder a sus propios tickets.
- Los endpoints protegidos deben rechazar solicitudes no autorizadas.

---

## Épica 2 - Gestión de incidencias

### US-003 - Registrar ticket

**Como** usuario  
**Quiero** registrar una incidencia  
**Para** solicitar soporte al área de TI.

**Criterios de aceptación:**

- El título es obligatorio.
- La descripción es obligatoria.
- Debe seleccionarse una categoría.
- Debe establecerse una prioridad.
- El sistema debe generar un número único de ticket.
- El ticket debe iniciar en estado NUEVO.

---

### US-004 - Consultar tickets

**Como** usuario  
**Quiero** consultar mis tickets  
**Para** conocer el estado de mis incidencias.

**Criterios de aceptación:**

- Deben mostrarse únicamente los tickets del usuario.
- Debe mostrarse el número del ticket.
- Debe mostrarse el título.
- Debe mostrarse la prioridad.
- Debe mostrarse el estado.
- Debe mostrarse la fecha de creación.

---

### US-005 - Asignar ticket

**Como** administrador  
**Quiero** asignar una incidencia a un técnico  
**Para** distribuir correctamente el trabajo.

**Criterios de aceptación:**

- Debe seleccionarse un técnico válido.
- El ticket debe registrar la fecha de asignación.
- Debe registrarse el técnico asignado.
- La acción debe aparecer en el historial.

---

### US-006 - Atender ticket

**Como** técnico  
**Quiero** visualizar los tickets que tengo asignados  
**Para** atender las incidencias pendientes.

**Criterios de aceptación:**

- El técnico debe visualizar únicamente los tickets correspondientes.
- Puede cambiar el estado.
- Puede agregar comentarios.
- Puede registrar un diagnóstico.
- Puede registrar una solución.

---

### US-007 - Cambiar estado

**Como** técnico  
**Quiero** actualizar el estado de una incidencia  
**Para** reflejar su progreso.

**Estados permitidos:**

- NUEVO
- ASIGNADO
- EN_PROCESO
- EN_ESPERA
- RESUELTO
- CERRADO
- REABIERTO

---

### US-008 - Agregar comentario

**Como** usuario o técnico  
**Quiero** agregar comentarios a un ticket  
**Para** mantener comunicación durante la atención.

---

### US-009 - Resolver ticket

**Como** técnico  
**Quiero** registrar la solución aplicada  
**Para** dejar constancia de cómo fue solucionada la incidencia.

---

### US-010 - Cerrar ticket

**Como** usuario  
**Quiero** confirmar que mi problema fue solucionado  
**Para** cerrar definitivamente la incidencia.

---

## Épica 3 - Administración

### US-011 - Gestionar usuarios

**Como** administrador  
**Quiero** gestionar usuarios  
**Para** controlar quién utiliza la plataforma.

---

### US-012 - Gestionar categorías

**Como** administrador  
**Quiero** gestionar categorías de incidencias  
**Para** clasificar correctamente los tickets.

---

### US-013 - Gestionar prioridades

**Como** administrador  
**Quiero** gestionar prioridades  
**Para** establecer diferentes niveles de atención.

---

## Épica 4 - Reportes

### US-014 - Consultar dashboard

**Como** administrador  
**Quiero** visualizar estadísticas de soporte  
**Para** conocer el estado general de las incidencias.

**Indicadores iniciales:**

- Total de tickets.
- Tickets nuevos.
- Tickets en proceso.
- Tickets resueltos.
- Tickets cerrados.
- Tickets críticos.
- Tiempo promedio de resolución.

---

## Épica 5 - Auditoría

### US-015 - Consultar historial

**Como** administrador  
**Quiero** consultar el historial de acciones  
**Para** conocer qué ocurrió durante la atención de cada ticket.

---

## Épica 6 - Calidad

### US-016 - Validar funcionalidades

**Como** equipo de desarrollo  
**Quiero** ejecutar pruebas funcionales  
**Para** verificar que el sistema cumple los requisitos definidos.

**Criterios de aceptación:**

- Las funcionalidades críticas deben tener casos de prueba.
- Las APIs deben probarse mediante Postman.
- Los errores encontrados deben documentarse.
- Las correcciones deben volver a probarse.