# 📋 Reporte de Revisión de Pull Request

## 📊 Información General

- **Proyecto**: {{PROJECT_NAME}}
- **PR**: {{PR_NUMBER}} - {{PR_TITLE}}
- **Autor**: {{PR_AUTHOR}}
- **Fecha de revisión**: {{REVIEW_DATE}}
- **Revisor**: PR Reviewer Bot v1.0
- **Rúbrica utilizada**: {{RUBRIC_USED}}

---

## 🎯 Resumen Ejecutivo

**Puntuación Final: {{FINAL_SCORE}}/10**

{{OVERALL_STATUS_ICON}} **Estado**: {{OVERALL_STATUS}}

### Puntuación por Categorías

| Categoría | Puntuación | Peso | Contribución |
|-----------|------------|------|--------------|
| 🔧 Calidad de Código | {{CODE_QUALITY_SCORE}}/10 | 25% | {{CODE_QUALITY_CONTRIBUTION}} |
| 🏗️ Arquitectura y Diseño | {{ARCHITECTURE_SCORE}}/10 | 20% | {{ARCHITECTURE_CONTRIBUTION}} |
| 🔒 Seguridad | {{SECURITY_SCORE}}/10 | 20% | {{SECURITY_CONTRIBUTION}} |
| 🧪 Testing | {{TESTING_SCORE}}/10 | 15% | {{TESTING_CONTRIBUTION}} |
| 📚 Documentación | {{DOCUMENTATION_SCORE}}/10 | 10% | {{DOCUMENTATION_CONTRIBUTION}} |
| ⚡ Performance | {{PERFORMANCE_SCORE}}/10 | 10% | {{PERFORMANCE_CONTRIBUTION}} |

### Modificadores de Puntuación
- **Señales de Alerta**: {{ALERT_DEDUCTIONS}} puntos
- **Bonificaciones**: +{{BONUS_POINTS}} puntos

---

## 📁 Archivos Analizados

{{#FILES_ANALYZED}}
### {{FILE_PATH}}
- **Tipo**: {{FILE_TYPE}}
- **Líneas modificadas**: {{LINES_CHANGED}}
- **Puntuación del archivo**: {{FILE_SCORE}}/10

{{FILE_COMMENTS}}

{{/FILES_ANALYZED}}

---

## 🔍 Análisis Detallado

### 🔧 Calidad de Código ({{CODE_QUALITY_SCORE}}/10)

{{CODE_QUALITY_ANALYSIS}}

**Aspectos Positivos:**
{{#CODE_QUALITY_POSITIVES}}
- ✅ {{.}}
{{/CODE_QUALITY_POSITIVES}}

**Áreas de Mejora:**
{{#CODE_QUALITY_IMPROVEMENTS}}
- ⚠️ {{.}}
{{/CODE_QUALITY_IMPROVEMENTS}}

### 🏗️ Arquitectura y Diseño ({{ARCHITECTURE_SCORE}}/10)

{{ARCHITECTURE_ANALYSIS}}

**Aspectos Positivos:**
{{#ARCHITECTURE_POSITIVES}}
- ✅ {{.}}
{{/ARCHITECTURE_POSITIVES}}

**Áreas de Mejora:**
{{#ARCHITECTURE_IMPROVEMENTS}}
- ⚠️ {{.}}
{{/ARCHITECTURE_IMPROVEMENTS}}

### 🔒 Seguridad ({{SECURITY_SCORE}}/10)

{{SECURITY_ANALYSIS}}

**Aspectos Positivos:**
{{#SECURITY_POSITIVES}}
- ✅ {{.}}
{{/SECURITY_POSITIVES}}

**Vulnerabilidades Encontradas:**
{{#SECURITY_ISSUES}}
- 🚨 **{{SEVERITY}}**: {{DESCRIPTION}}
  - **Ubicación**: {{LOCATION}}
  - **Recomendación**: {{RECOMMENDATION}}
{{/SECURITY_ISSUES}}

### 🧪 Testing ({{TESTING_SCORE}}/10)

{{TESTING_ANALYSIS}}

**Cobertura de Tests**: {{TEST_COVERAGE}}%

**Aspectos Positivos:**
{{#TESTING_POSITIVES}}
- ✅ {{.}}
{{/TESTING_POSITIVES}}

**Tests Faltantes:**
{{#TESTING_MISSING}}
- ❌ {{.}}
{{/TESTING_MISSING}}

### 📚 Documentación ({{DOCUMENTATION_SCORE}}/10)

{{DOCUMENTATION_ANALYSIS}}

**Aspectos Positivos:**
{{#DOCUMENTATION_POSITIVES}}
- ✅ {{.}}
{{/DOCUMENTATION_POSITIVES}}

**Documentación Faltante:**
{{#DOCUMENTATION_MISSING}}
- 📝 {{.}}
{{/DOCUMENTATION_MISSING}}

### ⚡ Performance ({{PERFORMANCE_SCORE}}/10)

{{PERFORMANCE_ANALYSIS}}

**Optimizaciones Encontradas:**
{{#PERFORMANCE_POSITIVES}}
- ✅ {{.}}
{{/PERFORMANCE_POSITIVES}}

**Problemas de Performance:**
{{#PERFORMANCE_ISSUES}}
- ⚠️ {{ISSUE}}
  - **Impacto**: {{IMPACT}}
  - **Sugerencia**: {{SUGGESTION}}
{{/PERFORMANCE_ISSUES}}

---

## 🚨 Señales de Alerta Detectadas

{{#ALERT_SIGNALS}}
### {{ALERT_TYPE}}
- **Descripción**: {{ALERT_DESCRIPTION}}
- **Ubicación**: {{ALERT_LOCATION}}
- **Descuento**: -{{ALERT_PENALTY}} puntos
- **Recomendación**: {{ALERT_RECOMMENDATION}}
{{/ALERT_SIGNALS}}

---

## 🌟 Bonificaciones Otorgadas

{{#BONUS_ITEMS}}
### {{BONUS_TYPE}}
- **Descripción**: {{BONUS_DESCRIPTION}}
- **Puntos**: +{{BONUS_VALUE}}
{{/BONUS_ITEMS}}

---

## 🎯 Recomendaciones de Acción

### {{ACTION_REQUIRED}}

{{DETAILED_RECOMMENDATIONS}}

### Próximos Pasos:
{{#NEXT_STEPS}}
1. {{.}}
{{/NEXT_STEPS}}

---

## 📈 Comparación con Revisiones Anteriores

{{#HISTORICAL_COMPARISON}}
- **Revisión anterior**: {{PREVIOUS_SCORE}}/10
- **Tendencia**: {{TREND_ICON}} {{TREND_DESCRIPTION}}
- **Mejoras detectadas**: {{IMPROVEMENTS_COUNT}}
- **Nuevos problemas**: {{NEW_ISSUES_COUNT}}
{{/HISTORICAL_COMPARISON}}

---

## 🔗 Links de Referencia

- [Rúbrica utilizada]({{RUBRIC_PATH}})
- [Guía de mejores prácticas]({{BEST_PRACTICES_GUIDE}})
- [Documentación del proyecto]({{PROJECT_DOCS}})

---

## 📝 Comentarios Adicionales

{{ADDITIONAL_COMMENTS}}

---

**Reporte generado automáticamente el {{TIMESTAMP}} por PR Reviewer Bot**

*¿Tienes preguntas sobre este reporte? Revisa nuestra [documentación]({{DOCUMENTATION_LINK}}) o contacta al equipo de desarrollo.*
