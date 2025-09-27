# 🔍 PR Reviewer - GitHub Actions Integration

Este directorio contiene los workflows de GitHub Actions para automatizar las revisiones de Pull Requests.

### Workflows Disponibles

- **🔍 PR Review** - Revisión automática en cada PR
- **🔄 Manual Review** - Revisión manual bajo demanda

## 🔧 Configuración Requerida

### Secrets de GitHub

Para que los workflows funcionen correctamente, necesitas configurar estos secrets en tu repositorio:

1. **`CLAUDE_API_KEY`** (REQUERIDO)
   - Tu clave de API de Claude de Anthropic
   - Ve a: Settings → Secrets and variables → Actions → New repository secret

### Permisos

Los workflows requieren los siguientes permisos:
- `contents: read` - Para leer el código del repositorio
- `pull-requests: write` - Para comentar en PRs
- `issues: write` - Para crear comentarios

## 🚀 Cómo Usar

### Activación Automática

1. **Configura el secret CLAUDE_API_KEY** en tu repositorio
2. **Crea un PR** - El workflow se ejecutará automáticamente
3. **Revisa el comentario** generado automáticamente
4. **Verifica el status check** en el commit

### Testing Manual

1. Ve a la pestaña **Actions** en tu repositorio
2. Selecciona el workflow **"Setup PR Reviewer"**
3. Haz clic en **"Run workflow"**
4. Selecciona el escenario de prueba deseado
5. Ejecuta y revisa los resultados

## 📊 Interpretación de Resultados

### Status Checks

El workflow creará un status check con estos estados:

- 🌟 **Success (9-10/10)**: Excelente - Listo para merge
- ✅ **Success (7-8/10)**: Aprobado - Cambios menores opcionales
- ⚠️ **Failure (5-6/10)**: Requiere cambios - Revisar comentarios
- ❌ **Failure (1-4/10)**: Rechazado - Refactorización necesaria
- 🔴 **Error**: Error en análisis - Revisar manualmente

### Comentarios en PR

Los comentarios incluyen:
- **Puntuación final** y estado
- **Reporte completo** (colapsable)
- **Timestamp** de generación
- **Enlaces** a documentación

### Artifacts

Los reportes se almacenan como artifacts de GitHub por 30 días:
- Accesibles desde la pestaña Actions
- Formato: `pr-review-{PR_NUMBER}-{RUN_NUMBER}`
- Contienen el reporte completo en Markdown

## ⚙️ Personalización

### Modificar Triggers

Edita `pr-review.yml` para cambiar cuándo se ejecuta:

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main, master, develop, staging]  # Agregar más branches
    paths-ignore:  # Ignorar ciertos archivos
      - '**.md'
      - 'docs/**'
```

### Personalizar Rúbricas

El workflow usa automáticamente las rúbricas del directorio `scripts/rubrics/`:

```bash
# Para usar una rúbrica específica, modifica el workflow:
./review.sh --branch "${{ steps.pr-info.outputs.base_branch }}" --rubric "frontend-rubric.md"
```

### Configurar Notificaciones

Puedes agregar steps adicionales para notificaciones:

```yaml
- name: 📬 Send Slack notification
  if: steps.review.outputs.final_score < 7
  # Agregar tu lógica de notificación aquí
```

## 🔍 Troubleshooting

### Problemas Comunes

**❌ Error: CLAUDE_API_KEY not set**
- Verifica que el secret esté configurado correctamente
- Asegúrate de que el nombre sea exactamente `CLAUDE_API_KEY`

**❌ Error: Permission denied**
- Verifica que el repositorio tenga los permisos correctos
- Los forks pueden tener limitaciones en los secrets

**❌ Error: Review failed**
- Revisa los logs del workflow para detalles
- Verifica que la rúbrica y templates existan
- Confirma que jq esté instalado correctamente

**❌ Error: No changes to review**
- Normal si el PR no tiene cambios de código
- El workflow se saltará automáticamente

### Debug

Para debug adicional, modifica el workflow:

```yaml
- name: 🔍 Run PR Review Analysis
  run: |
    cd scripts
    # Activar modo debug y verbose
    ./review.sh --debug --verbose --branch "${{ steps.pr-info.outputs.base_branch }}"
```

### Logs

Los logs están disponibles en:
1. **Actions tab** → Workflow run → Job details
2. **Artifacts** con reportes detallados
3. **PR comments** con resumen de resultados

## 📈 Métricas y Monitoring

### Built-in Metrics

Los workflows generan automáticamente:
- Tiempo de ejecución
- Tasa de éxito/fallo
- Distribución de puntuaciones
- Artifacts generados

### Custom Metrics

Puedes agregar steps para enviar métricas a servicios externos:

```yaml
- name: 📊 Send metrics
  run: |
    # Enviar métricas a DataDog, New Relic, etc.
    curl -X POST "your-metrics-endpoint" \
      -d "score=${{ steps.review.outputs.final_score }}"
```

## 🔒 Seguridad

### Best Practices

- ✅ Nunca hardcodees API keys en workflows
- ✅ Usa secrets de GitHub para información sensible
- ✅ Limita permisos al mínimo necesario
- ✅ Revisa regularmente los logs de workflows
- ✅ Actualiza dependencies regularmente

### Limitaciones

- Los workflows en forks tienen limitaciones de secrets
- Rate limits de APIs (Claude, GitHub)
- Timeouts de workflows (máximo 6 horas)

---

**¿Necesitas ayuda?** Consulta la [documentación principal](../README.md) o crea un issue.
