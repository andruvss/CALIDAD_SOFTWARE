# 05. Análisis estático del código fuente – Sistema Atlas

## 1. Objetivo y alcance

Auditar el código fuente de Atlas (BACKEND y FRONTEND) mediante herramientas de análisis estático, con el fin de identificar deficiencias de calidad y vulnerabilidades, y contrastarlas con la revisión manual y con los requisitos del ERS v1.1 (NFR-SEG-1 a 9).

## 2. Herramientas utilizadas

| Herramienta | Propósito | Alcance |
|---|---|---|
| SonarQube Community | Calidad (bugs, code smells, duplicación) y seguridad (vulnerabilidades, hotspots) | `BACKEND/src`, `FRONTEND/src` |
| Semgrep (`p/owasp-top-ten`, `p/javascript`, `p/nodejsscan`, `p/secrets`, `p/jwt`, `p/dockerfile`) | Detección de patrones inseguros según OWASP | BACKEND, FRONTEND, Dockerfile |
| npm audit | Vulnerabilidades conocidas en dependencias (SCA) | `package-lock.json` de backend y frontend |

## 3. Resultados

### 3.1 SonarQube

| Métrica | Valor | Calificación |
|---|---|---|
| Líneas de código (ncloc) | 6.955 | – |
| Bugs | 10 | Confiabilidad: C |
| Vulnerabilidades | 4 | Seguridad: **E** |
| Security Hotspots | 0 | – |
| Code Smells | 9 | Mantenibilidad: A |
| Duplicación | 16,4 % | – |

**Lectura:** la calificación de seguridad E es la más baja de la escala, y es consistente con las fallas críticas detectadas manualmente. La mantenibilidad es A, por lo que el principal problema del código es la seguridad y no su estructura. Los 0 hotspots no implican ausencia de riesgo: SonarQube no detecta la falta de autenticación ni de TLS, que se identificaron por revisión manual.

**Detalle de vulnerabilidades y bugs:** [COMPLETAR con la lista obtenida de SonarQube: archivo, regla, severidad].

### 3.2 Semgrep

Ejecución 1 (`p/owasp-top-ten`): 73 reglas, 46 archivos, **0 hallazgos**.
Ejecución 2 (reglas ampliadas): 226 reglas, 70 archivos, **3 hallazgos**.

| # | Archivo | Regla | Evaluación |
|---|---|---|---|
| 1 | `BACKEND/Dockerfile` | `missing-user` (contenedor ejecuta como root) | Verdadero positivo. Coincide con hallazgo manual 13 |
| 2 | `BACKEND/src/routes/auth.js` | `node_timing_attack` (comparación con `!==`) | Verdadero positivo. Coincide con hallazgo manual 1 (contraseñas en texto plano) y agrega riesgo de timing attack |
| 3 | `BACKEND/src/routes/contracts.js` | `express_xss` | **Falso positivo**: el endpoint `GET /:id/file` envía un archivo almacenado con `Content-Type: application/pdf` fijo, sin reflejar entrada en HTML. Riesgo residual bajo, asociado a la falta de validación de archivos |

**Limitación observada:** el ruleset OWASP por defecto no detectó ninguna de las fallas de lógica de negocio (rutas sin autenticación, IDOR, escalamiento por rol en cliente). Esto justifica combinar análisis estático con revisión manual y pruebas dinámicas.

### 3.3 npm audit (análisis de dependencias)

| Proyecto | Total | Crítica | Alta | Moderada | Baja |
|---|---|---|---|---|---|
| Backend | 13 | 1 | 9 | 3 | 0 |
| Frontend | 27 | 0 | 20 | 6 | 1 |
| **Total** | **40** | **1** | **29** | **9** | **1** |

- **Crítica (backend):** `proxy-addr` 1.1.0 – 2.0.7, suplantación de IP mediante subred IPv4-mapped IPv6 (GHSA-jqcg-44mw-7w3h). Dependencia transitiva de Express. Corrección disponible con `npm audit fix`.
- **Relevante para NFR-SEG-9:** `jws` < 3.2.3, librería usada por `jsonwebtoken` para firmar tokens.
- Otros paquetes afectados en backend: `body-parser`, `brace-expansion`, `minimatch`, `morgan`, `path-to-regexp`, `picomatch`, `qs`.

## 4. Consolidado y correlación con la revisión manual

| Hallazgo manual | ¿Detectado por herramienta? | Herramienta |
|---|---|---|
| 1. Contraseñas en texto plano | Parcial | Semgrep (timing attack en la comparación) |
| 2. Usuarios sin auth ni rol | No | Solo revisión manual |
| 3. Auditoría sin token | No | Solo revisión manual |
| 4. IDOR en contratos | No | Solo revisión manual |
| 5. Rol en localStorage | No | Solo revisión manual |
| 6. Secretos versionados | [VERIFICAR] | Semgrep `p/secrets` no lo reportó (ver nota) |
| 7. Sin TLS, CORS abierto, sin Helmet | No | Solo revisión manual |
| 13. Dockerfile como root | Sí | Semgrep |
| 13. Dependencias vulnerables | Sí | npm audit |

*Nota:* Semgrep solo analiza archivos rastreados por git; confirmar si `.env` quedó incluido en el escaneo antes de afirmar que no fue detectado.

## 5. Conclusiones

1. La seguridad es el área crítica del proyecto (calificación E), mientras que la mantenibilidad es adecuada (A).
2. Las herramientas automáticas cubrieron una fracción menor de los hallazgos; las fallas de control de acceso solo se identificaron por revisión manual y deberán confirmarse con pruebas dinámicas (Postman/ZAP).
3. Se detectaron 40 vulnerabilidades en dependencias, incluida 1 crítica, lo que incumple NFR-SEG-5 y el criterio de aceptación "pruebas de penetración sin hallazgos críticos".
4. Se recomienda: actualizar dependencias, ejecutar el contenedor como usuario no root, eliminar duplicación y corregir los bugs de confiabilidad.

## 6. Evidencias

Archivos en `docs/evidencias/`: `npm-audit-backend.txt`, `npm-audit-frontend.txt`, `semgrep.txt`, `semgrep-extra.txt` y capturas del dashboard de SonarQube.