# Diseño de casos de prueba - Atlas

Entorno: Docker Compose. API en http://localhost:4450. Resultado real: se completa en la ejecución.

---
### CP-01 - Autenticación con credenciales válidas e inválidas
- **Descripción:** Verificar el inicio de sesión y la emisión de JWT.
- **Requisito:** RF-1.1
- **Datos de entrada:** POST /autenticacion/login. (a) usuario y contraseña válidos; (b) contraseña incorrecta; (c) usuario inexistente.
- **Resultado esperado:** (a) 200 y token JWT; (b) y (c) 401 con mensaje genérico.
- **Criterios de aceptación:** Token válido con expiración; sin diferenciar usuario o contraseña en el error; respuesta < 300 ms.
- **Tipo:** Funcional

### CP-02 - Cierre de sesión y revocación de tokens
- **Descripción:** Verificar que el logout invalida el token.
- **Requisito:** RF-1.2, NFR-SEG-9
- **Datos de entrada:** Token válido; llamar al endpoint de logout; reutilizar el token.
- **Resultado esperado:** El token reutilizado es rechazado (401).
- **Criterios de aceptación:** Existe endpoint de logout y el token queda revocado.
- **Tipo:** Seguridad

### CP-07 - Rol editor solo lectura
- **Descripción:** Verificar que el backend impide escribir al rol editor.
- **Requisito:** RF-3.2, RB-4, NFR-SEG-4
- **Datos de entrada:** Token de usuario editor; POST /clientes, PUT /clientes/:id, DELETE /clientes/:id.
- **Resultado esperado:** 403 en las tres operaciones; GET permitido.
- **Criterios de aceptación:** Ninguna escritura se ejecuta; el bloqueo ocurre en el backend, no solo en la interfaz.
- **Tipo:** Seguridad

### CP-13 - Validación de archivos adjuntos
- **Descripción:** Verificar formatos y tamaño permitidos en la subida.
- **Requisito:** RF-5.2
- **Datos de entrada:** POST /contratos con archivo (a) PDF válido; (b) .exe; (c) .php renombrado a .pdf; (d) archivo > 10 MB.
- **Resultado esperado:** (a) aceptado; (b), (c) y (d) rechazados con 400 o 415.
- **Criterios de aceptación:** Solo PDF, DOC, PPT, JPG y PNG; límite de tamaño definido.
- **Tipo:** Seguridad

### CP-17 - Auditoría de acciones críticas
- **Descripción:** Verificar el registro y la protección de la auditoría.
- **Requisito:** RF-6.1, NFR-SEG-6
- **Datos de entrada:** Crear, editar y eliminar un cliente y un contrato; luego GET /auditoria (con y sin token).
- **Resultado esperado:** Cada acción queda registrada con usuario y fecha; /auditoria sin token devuelve 401.
- **Criterios de aceptación:** Registro en el 100% de las acciones críticas; auditoría accesible solo a usuarios autorizados.
- **Tipo:** Funcional / Normativa

### CP-19 - Hash de contraseñas
- **Descripción:** Verificar que las contraseñas no se almacenan en texto plano.
- **Requisito:** NFR-SEG-2
- **Datos de entrada:** Registrar un usuario y consultar la tabla `usuarios` en PostgreSQL.
- **Resultado esperado:** `contrasena_hash` contiene un hash bcrypt (prefijo $2b$).
- **Criterios de aceptación:** Ninguna contraseña legible en la BD.
- **Tipo:** Seguridad

### CP-21 - Control de acceso entre empresas (IDOR)
- **Descripción:** Verificar que un usuario no accede a datos de otra empresa.
- **Requisito:** RB-2, NFR-SEG-4, NOR-01
- **Datos de entrada:** (a) GET /contratos/:id y GET /contratos/:id/file sin token; (b) con token de la empresa A pidiendo un contrato de la empresa B; (c) DELETE /contratos/:id sin token.
- **Resultado esperado:** 401 sin token; 403 o 404 entre empresas; el contrato no se elimina.
- **Criterios de aceptación:** Ningún dato ni documento accesible sin autorización.
- **Tipo:** Seguridad / Normativa

### CP-22 - Inyección SQL y XSS
- **Descripción:** Verificar la validación y el saneamiento de entradas.
- **Requisito:** NFR-SEG-5
- **Datos de entrada:** En login y en el buscador de clientes: `' OR '1'='1`, `'; DROP TABLE clientes;--`; en nombre de cliente: `<script>alert(1)</script>`.
- **Resultado esperado:** Entradas rechazadas o tratadas como texto; el script no se ejecuta al listar.
- **Criterios de aceptación:** Sin acceso indebido, sin errores de BD expuestos y sin ejecución de scripts.
- **Tipo:** Seguridad

### CP-27 - Tiempo de respuesta CRUD
- **Descripción:** Medir el rendimiento de operaciones simples.
- **Requisito:** NFR-PERF-1
- **Datos de entrada:** k6 con 50 usuarios virtuales durante 1 min sobre GET /clientes y POST /clientes.
- **Resultado esperado:** Percentil 95 < 300 ms.
- **Criterios de aceptación:** Umbral cumplido y 0% de errores.
- **Tipo:** Rendimiento