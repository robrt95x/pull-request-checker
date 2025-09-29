# 🔍 Revisor de Pull Requests con Claude Code

Sistema automatizado de revisión de código que utiliza Claude Code para analizar pull requests y generar reportes detallados basados en una rúbrica personalizable.

> **� IMPORTANTE**: Esta herramienta genera artefactos de análisis, NO comenta directamente en el PR.

## � ¿Qué hace esta herramienta?

- **🤖 Análisis Automatizado**: Se ejecuta automáticamente en cada PR usando Claude Code
- **� Evaluación Estructurada**: Análisis detallado con puntuación (escala 1-10)
- **� Generación de Artefactos**: Crea un archivo `check-results.md` con el análisis completo
- **� Identificación de Oportunidades**: Detecta áreas de mejora en código, arquitectura, seguridad y más
- **💬 Resumen en PR**: Publica un comentario con resumen y enlace al análisis completo

## 🚀 Configuración Rápida

### 1. Instalar Claude Code App
```bash
# Instala la aplicación Claude GitHub App en tu repositorio
# Visita: https://github.com/apps/claude-code
# Haz clic en "Configure" y selecciona tu repositorio
```

### 2. Agregar Clave API a Secrets
```bash
# En tu repositorio de GitHub:
# 1. Ve a Settings → Secrets and variables → Actions
# 2. Haz clic en "New repository secret"
# 3. Nombre: ANTHROPIC_API_KEY
# 4. Valor: tu-clave-api-de-claude
```

### 3. ¡Listo! 🎉
- Crea o actualiza cualquier Pull Request
- Claude analiza automáticamente el código
- Recibe un comentario con resumen y enlace al análisis completo en artefactos

## 📋 ¿Cómo Funciona?

1. **Activación Automática**: Al abrir/actualizar un PR, Claude Code se ejecuta automáticamente
2. **Análisis con Rúbrica**: Evalúa el código usando la rúbrica detallada en `CLAUDE.md`
3. **Evaluación en 6 Categorías** (puntuación 1-10):
   - 🔧 Calidad de Código (25% peso)
   - 🏗️ Arquitectura y Diseño (20% peso) 
   - 🔒 Seguridad (20% peso)
   - 🧪 Testing (15% peso)
   - 📚 Documentación (10% peso)
   - ⚡ Rendimiento (10% peso)
4. **Generación de Artefacto**: Crea un archivo `check-results.md` con el análisis detallado
5. **Comentario de Resumen**: Publica un comentario en el PR con las primeras líneas y enlace al artefacto completo

## 🎯 Comandos Interactivos

Comenta en cualquier PR para activar análisis específicos:

```
@claude /review
```
→ Revisión completa de código con puntuación detallada

```
@claude /security  
```
→ Enfoque específico en análisis de seguridad

```
@claude /performance
```
→ Analiza cuellos de botella y optimizaciones de rendimiento

```
@claude /fix [problema]
```
→ Obtén sugerencias para solucionar problemas específicos

## ⚙️ Configuración

La rúbrica de revisión y sistema de puntuación está definido en [`CLAUDE.md`](CLAUDE.md). Puedes personalizar:

- **Umbrales de puntuación** (puntuación mínima para aprobar: 7/10)
- **Pesos de categorías** (Calidad de Código: 25%, Seguridad: 20%, etc.)
- **Señales de alerta** (deducciones automáticas por problemas de seguridad)
- **Criterios de bonificación** (puntos extra por excelencia)

## 📊 Formato de Revisión

Cada revisión genera un artefacto `check-results.md` con:

```markdown
## 📊 Resumen de Revisión de Código
**Puntuación Final: 8.2/10**
**Estado: APROBADO**

### Puntuaciones por Categoría
- 🔧 Calidad de Código: 8/10 (Peso: 25%)
- 🏗️ Arquitectura: 9/10 (Peso: 20%)
- 🔒 Seguridad: 7/10 (Peso: 20%)
- 🧪 Testing: 8/10 (Peso: 15%)
- 📚 Documentación: 9/10 (Peso: 10%)
- ⚡ Rendimiento: 8/10 (Peso: 10%)

## 📁 Análisis Detallado por Archivo
**src/api/users.js**: 
**Línea 15**: Falta validación de entrada
**Líneas 23-25**: Buena estructura, considerar refactorizar
```

El comentario en el PR incluye un resumen y enlace para descargar el análisis completo.

## 🔄 Acerca del Proyecto

Este proyecto es una demostración de integración con Claude Code para revisión asistida de Pull Requests. 

**¿Qué NO hace?**
- ❌ No genera comentarios directos línea por línea en el PR
- ❌ No hace revisiones interactivas en tiempo real

**¿Qué SÍ hace?**
- ✅ Genera artefactos de análisis detallados (`check-results.md`)
- ✅ Publica resumen en comentario del PR con enlace al análisis completo
- ✅ Identifica áreas de oportunidad basadas en rúbrica personalizable
- ✅ Proporciona puntuación estructurada por categorías

## 📄 Estructura de Archivos

```
├── .github/workflows/
│   └── claude-review.yml     # Workflow principal
├── CLAUDE.md                 # Configuración y rúbrica
├── package.json              # Configuración del proyecto
└── README.md                 # Este archivo
```

## 🤝 Contribuir

1. Haz fork del repositorio
2. Modifica la rúbrica en `CLAUDE.md` o la configuración del workflow
3. Prueba con un PR de ejemplo
4. Envía un pull request

## � Licencia

MIT License - siéntete libre de usar y modificar para tus proyectos!

---

**⚡ Powered by Claude Code** - Haciendo las revisiones de código más rápidas, consistentes y perspicaces.
