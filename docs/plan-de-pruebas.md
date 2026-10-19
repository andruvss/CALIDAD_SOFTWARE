# Plan de pruebas - Sistema de Gestión Atlas

## 1. Introducción
Este plan define cómo se verificará la calidad, la seguridad y el cumplimiento
normativo del sistema Atlas (React + Express + PostgreSQL), según el ERS v1.1
de CreaLab SpA. Se integran pruebas funcionales, no funcionales y de seguridad,
con análisis estático del código fuente.

## 2. Objetivos
- Verificar el 100% de los requisitos del ERS (RF, NFR y RB) mediante la
  matriz de trazabilidad (docs/01).
- Identificar vulnerabilidades y problemas de calidad en el código.
- Evaluar el cumplimiento de los criterios CAL, SEG y NOR (docs/02).
- Documentar incidentes con su criticidad y recomendaciones de mejora.

## 3. Alcance
**Incluido:** API backend (todas las rutas), frontend, base de datos, archivos
Docker y dependencias.
**Excluido:** infraestructura de producción, certificados reales, integración
de correo y pruebas con usuarios reales (se simulan con checklist).

## 4. Estrategia de pruebas
Enfoque basado en riesgo, con la seguridad y la normativa como pilares:
1. **Análisis estático (shift-left):** SonarQube, Semgrep y npm audit sobre el código.
2. **Revisión manual** de rutas críticas: autenticación, autorización y archivos.
3. **Pruebas de API** con Postman/Swagger contra el entorno Docker.
4. **Pruebas dinámicas de seguridad** con OWASP ZAP.
5. **Pruebas no funcionales:** rendimiento con k6 y usabilidad con checklist WCAG.
6. **Priorización:** primero los requisitos de prioridad Alta/Esencial y los de
   seguridad, por el riesgo sobre datos personales.

## 5. Tipos de prueba y justificación
| Tipo | Justificación | Casos |
|---|---|---|
| Funcional | Verifica que cada RF cumpla su criterio de aceptación | CP-01, 03 a 06, 08 a 12, 14 a 17, 35, 36 |
| Seguridad | Los datos de contratos y clientes son sensibles (OWASP Top 10) | CP-02, 07, 13, 18 a 23, 26 |
| Normativa | Evidencia el cumplimiento de Ley 19.628/21.719 y trazabilidad | CP-17, 24, 25 |
| Rendimiento | Valida los umbrales de NFR-PERF | CP-27 a 29 |
| Usabilidad / accesibilidad | El ERS exige foco en adultos mayores | CP-30 a 32 |
| Compatibilidad / disponibilidad | NFR-COMPAT y NFR-DIS | CP-33, 34 |
| Estático | Detecta defectos y vulnerabilidades sin ejecutar el sistema | Análisis de código |

## 6. Criterios de aceptación del plan
- Todo caso funcional aprobado cumple el resultado esperado del ERS.
- 0 vulnerabilidades críticas abiertas (criterio del ERS en NFR-SEG).
- Cobertura del 100% de los requisitos en la matriz.
- CRUD < 300 ms, carga de página < 2 s, subida/descarga < 10 s.
- Cada incidente queda documentado con criticidad y recomendación.

**Escala de criticidad:**
| Nivel | Descripción |
|---|---|
| Crítica | Compromete datos o acceso sin autenticación |
| Alta | Incumple un requisito esencial de seguridad |
| Media | Afecta calidad o funcionalidad sin exponer datos |
| Baja | Mejora menor o estética |

## 7. Herramientas
| Herramienta | Uso |
|---|---|
| SonarQube Community | Calidad y vulnerabilidades del código |
| Semgrep | Reglas OWASP sobre el código |
| npm audit | Vulnerabilidades en dependencias |
| Postman / Swagger (/docs) | Pruebas de API |
| OWASP ZAP | Escaneo dinámico |
| k6 | Pruebas de carga |
| Lighthouse | Rendimiento y accesibilidad |
| Docker Compose | Entorno de pruebas |

## 8. Recursos
- **Humanos:** integrantes del grupo (roles: análisis estático, pruebas de API,
  seguridad, documentación).
- **Entorno:** `docker compose up` (frontend 3350, backend 4450, PostgreSQL 15432).
- **Datos de prueba:** `dump-atlas.sql` y usuarios con rol administrador y editor.
- **Documentos:** ERS v1.1, código fuente, feedback de la Evaluación 1.

## 9. Cronograma
| Semana | Actividad |
|---|---|
| 1 | Plan, matriz de trazabilidad y criterios |
| 2 | Análisis estático (SonarQube, Semgrep, npm audit) |
| 3 | Ejecución de casos funcionales y de seguridad (API y ZAP) |
| 4 | Pruebas no funcionales, informe de incidentes y análisis ético-normativo |
| 5 | Informe final, presentación y video |

## 10. Entradas y salidas
**Entradas:** ERS, código, entorno Docker.
**Salidas:** reporte de análisis estático, casos ejecutados, registro de
incidentes e informe final.