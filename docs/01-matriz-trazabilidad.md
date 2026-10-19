Caso	Requisito ERS	Qué se prueba	Tipo
CP-01	RF-1.1	Login con credenciales válidas e inválidas	Funcional
CP-02	RF-1.2	Logout invalida el token	Seguridad
CP-03	RF-2.1	Registro de usuario con usuario, contraseña y correo	Funcional
CP-04	RF-2.2	Crear empresa con nombre, dirección, teléfono y correo	Funcional
CP-05	RF-2.3	Primer usuario de la empresa queda como administrador	Funcional
CP-06	RF-3.1	Admin crea usuario y asigna rol	Funcional
CP-07	RF-3.2, RB-4	Editor no puede crear, editar ni eliminar	Seguridad
CP-08	RF-3.3, RB-5	Admin modifica y elimina usuarios	Funcional
CP-09	RF-4.1	Crear cliente	Funcional
CP-10	RF-4.2	Listar con paginación y filtro, editar y eliminar	Funcional
CP-11	RF-4.3	Validación de campos y formatos	Funcional
CP-12	RF-5.1	Crear contrato asociado a cliente	Funcional
CP-13	RF-5.2	Adjuntar PDF, DOC, PPT, JPG, PNG y rechazar otros	Seguridad
CP-14	RF-5.3	Documento almacenado y referenciado en BD	Funcional
CP-15	RF-5.4	Estado del contrato según fechas	Funcional
CP-16	RF-5.5	Generar enlace para compartir documento	Funcional
CP-17	RF-6.1	Auditoría de acciones críticas	Funcional / Normativa
CP-18	NFR-SEG-1	TLS en comunicaciones	Seguridad
CP-19	NFR-SEG-2	Contraseñas con hash bcrypt en BD	Seguridad
CP-20	NFR-SEG-3	Datos sensibles cifrados en reposo	Seguridad
CP-21	NFR-SEG-4, RB-2	Acceso sin token y entre empresas (IDOR)	Seguridad
CP-22	NFR-SEG-5	SQL Injection, XSS y CSRF	Seguridad
CP-23	NFR-SEG-6	Logs sin datos sensibles ni errores detallados	Seguridad
CP-24	NFR-SEG-7	Política de respaldo y recuperación	Seguridad
CP-25	NFR-SEG-8	Cumplimiento Ley 19.628 y 21.719	Normativa
CP-26	NFR-SEG-9	JWT: expiración, firma y manipulación	Seguridad
CP-27	NFR-PERF-1	CRUD en menos de 300 ms	Rendimiento
CP-28	NFR-PERF-2	Carga de página en menos de 2 s	Rendimiento
CP-29	NFR-PERF-3	200 usuarios concurrentes	Rendimiento
CP-30	NFR-USAB-1	Tipografía, contraste y controles grandes	Usabilidad
CP-31	NFR-USAB-2, USAB-3	Flujo de registro claro y mensajes de error amigables	Usabilidad
CP-32	NFR-USAB-4	Flujo clientes → contratos	Usabilidad
CP-33	NFR-DIS-1, DIS-2	Disponibilidad y ventana de mantenimiento	Disponibilidad
CP-34	NFR-COMPAT-1, COMPAT-2	Navegadores y diseño responsivo	Compatibilidad
CP-35	RB-1	Correo único como principal	Funcional
CP-36	RB-3	Contrato asociado a un solo cliente	Funcional