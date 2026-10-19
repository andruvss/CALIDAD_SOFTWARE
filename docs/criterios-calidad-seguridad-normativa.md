# Criterios de calidad, seguridad y cumplimiento normativo - Atlas

## 1. Importancia de la calidad, la seguridad y el cumplimiento legal

**Calidad.** Atlas gestiona contratos y datos de clientes de pymes. Un error
funcional (por ejemplo, calcular mal el estado "vencido" de un contrato) puede
llevar a una empresa a perder plazos o renovaciones. La calidad reduce el costo
de corregir defectos, que crece cuanto más tarde se detectan.

**Seguridad.** El sistema almacena datos personales y bancarios. Una falla de
control de acceso, como la que permite leer contratos de otra empresa sin
token, expone información confidencial y destruye la confianza del cliente.

**Cumplimiento legal.** Incumplir la normativa de datos personales conlleva
multas, sanciones y daño reputacional. Por eso el cumplimiento no es un
extra: es un requisito de calidad (NFR-SEG-8 del ERS).

**Relación entre los tres.** Son pilares interdependientes: un sistema
funcional pero inseguro no es de calidad; un sistema seguro pero que trata
datos sin base legal no es aceptable; un sistema legal pero defectuoso no
cumple su propósito.

## 2. Marco normativo y estándares aplicables

| Norma / estándar | Aplicación a Atlas |
|---|---|
| Ley 19.628 sobre protección de la vida privada | Tratamiento de datos personales de clientes y usuarios |
| Ley 21.719 (nueva ley de protección de datos personales) | Consentimiento, derechos ARCO, medidas de seguridad, notificación de brechas (verificar fecha de entrada en vigencia) |
| Ley 21.459 sobre delitos informáticos | Acceso ilícito y alteración de datos: justifica el control de acceso y la auditoría |
| Ley 21.663 Marco de Ciberseguridad | Buenas prácticas de gestión de riesgos y reporte de incidentes |
| ISO/IEC 25010 | Modelo de calidad (funcionalidad, seguridad, rendimiento, usabilidad, compatibilidad) |
| OWASP Top 10 (2021) | Clasificación de vulnerabilidades web |
| OWASP ASVS | Lista de verificación de seguridad de aplicaciones |
| ISO/IEC 27001 (referencia) | Gestión de seguridad de la información |

## 3. Criterios a satisfacer

### Calidad (ISO 25010)
| ID | Criterio | Requisito ERS |
|---|---|---|
| CAL-01 | Los RF se cumplen según su criterio de aceptación | RF-1 a RF-6 |
| CAL-02 | CRUD simple responde en menos de 300 ms | NFR-PERF-1 |
| CAL-03 | Subida y descarga de documentos en menos de 10 s | RF-5 |
| CAL-04 | Página principal carga en menos de 2 s | NFR-PERF-2 |
| CAL-05 | Interfaz usable para adultos mayores | NFR-USAB-1 |
| CAL-06 | Código sin errores críticos ni duplicación excesiva en el análisis estático | Buenas prácticas |

### Seguridad (OWASP)
| ID | Criterio | Requisito ERS | OWASP |
|---|---|---|---|
| SEG-01 | Contraseñas con bcrypt | NFR-SEG-2 | A02 Fallas criptográficas |
| SEG-02 | Control de acceso por rol y empresa en backend | NFR-SEG-4, RB-2 | A01 Control de acceso roto |
| SEG-03 | Sin inyección SQL, XSS ni CSRF | NFR-SEG-5 | A03 Inyección |
| SEG-04 | Comunicaciones con TLS | NFR-SEG-1 | A02 |
| SEG-05 | JWT con expiración, logout y revocación | RF-1.2, NFR-SEG-9 | A07 Fallas de autenticación |
| SEG-06 | Sin secretos en el repositorio | NFR-SEG-3 | A05 Configuración insegura |
| SEG-07 | Subida de archivos validada | RF-5.2 | A04 Diseño inseguro |
| SEG-08 | Logs y errores sin información sensible | NFR-SEG-6 | A09 Fallas de registro |
| SEG-09 | Dependencias sin vulnerabilidades críticas | NFR-SEG-5 | A06 Componentes vulnerables |

### Cumplimiento normativo
| ID | Criterio | Norma |
|---|---|---|
| NOR-01 | Acceso a datos personales solo para usuarios autorizados | Ley 19.628 / 21.719 |
| NOR-02 | Datos sensibles protegidos (cifrado, control de acceso) | Ley 21.719 |
| NOR-03 | Trazabilidad de acciones críticas (auditoría) | Ley 21.719 / 21.663 |
| NOR-04 | Eliminación lógica con confirmación | RF-4 / derecho de supresión |
| NOR-05 | Prevención de acceso no autorizado | Ley 21.459 |
| NOR-06 | Respaldo y recuperación definidos | NFR-SEG-7 |