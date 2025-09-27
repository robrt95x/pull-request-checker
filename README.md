# 🔍 PR Reviewer - Sistema de Revisión Automática de Pull Requests

Un sistema completo para revisar automáticamente Pull Requests usando Claude AI, basado en rúbricas personalizables y que genera reportes detallados de feedback.

## 🚀 Características

- **Análisis automatizado** de Pull Requests con Claude AI
- **Rúbricas personalizables** para diferentes tipos de proyectos
- **Reportes detallados** en formato Markdown
- **Sistema de puntuación** ponderado por categorías
- **Detección de problemas** de seguridad, performance y calidad
- **Integración con Git** para análisis de diffs
- **Templates customizables** para reportes

## 📋 Estructura del Proyecto

```
pull-request-reviewer/
├── scripts/                    # Scripts principales
│   ├── review.sh              # Script principal de revisión
│   ├── utils.sh               # Funciones utilitarias
│   ├── config/                # Configuraciones
│   │   └── config.sh          # Configuración principal
│   ├── rubrics/               # Rúbricas de evaluación
│   │   └── code-review-rubric.md
│   ├── templates/             # Templates para reportes
│   │   └── report-template.md
│   └── output/                # Reportes generados
├── .github/                   # GitHub Actions workflows
│   ├── workflows/             # Workflows de CI/CD
│   │   ├── pr-review.yml      # Revisión automática
│   │   └── manual-review.yml  # Revisión manual
│   └── SETUP.md              # Guía de configuración
└── test-application/          # Aplicación de prueba
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Bash** (compatible con macOS/Linux)
- **Git** 
- **curl**
- **jq** (para procesamiento JSON)
- **Claude API Key** (de Anthropic)

### Instalación de dependencias

```bash
# macOS (usando Homebrew)
brew install jq

# Linux (Ubuntu/Debian)
sudo apt-get install jq curl git

# Linux (CentOS/RHEL)
sudo yum install jq curl git
```

### Configuración de API Key

```bash
# Exportar la clave de API de Claude
export CLAUDE_API_KEY="tu-clave-api-aqui"

# O agregar al archivo ~/.bashrc o ~/.zshrc para uso permanente
echo 'export CLAUDE_API_KEY="tu-clave-api-aqui"' >> ~/.bashrc
```

## 📖 Uso del Sistema

### Uso Básico

```bash
# Revisar cambios contra la branch main
cd scripts
./review.sh

# Revisar con opciones específicas
./review.sh --branch develop --rubric frontend-rubric.md --output my-review.md
```

### Opciones Disponibles

```bash
./review.sh [opciones]

Opciones:
  -b, --branch BRANCH     Branch objetivo (default: main)
  -r, --rubric RUBRIC     Archivo de rúbrica a usar
  -o, --output OUTPUT     Archivo de salida personalizado
  -d, --debug             Modo debug
  -v, --verbose           Modo verbose
  -h, --help              Mostrar ayuda
```

### Ejemplos de Uso

```bash
# Revisión básica contra main
./review.sh

# Revisión contra develop con modo debug
./review.sh --branch develop --debug

# Revisión con rúbrica personalizada
./review.sh --rubric frontend-rubric.md --output frontend-review.md

# Revisión verbose para troubleshooting
./review.sh --verbose --debug
```

## 📊 Sistema de Puntuación

### Categorías Evaluadas

| Categoría | Peso | Descripción |
|-----------|------|-------------|
| 🔧 Calidad de Código | 25% | Limpieza, estructura, nomenclatura |
| 🏗️ Arquitectura y Diseño | 20% | Patrones, modularidad, separación |
| 🔒 Seguridad | 20% | Vulnerabilidades, validación, exposición |
| 🧪 Testing | 15% | Cobertura, calidad de tests |
| 📚 Documentación | 10% | Comentarios, README, docs |
| ⚡ Performance | 10% | Optimización, eficiencia |

### Escala de Calificación

- **9-10**: Excelente - Aprobar inmediatamente
- **7-8**: Bueno - Aprobar con comentarios menores  
- **5-6**: Mejorable - Solicitar cambios
- **1-4**: Deficiente - Rechazar y refactorizar

### Modificadores de Puntuación

**Señales de Alerta (descuentos):**
- Hard-coded secrets: -5 puntos
- Console.log en producción: -2 puntos
- Código comentado: -1 punto
- Magic numbers: -1 punto

**Bonificaciones (hasta +5 puntos):**
- Refactoring que mejora código: +1 punto
- Documentación excepcional: +1 punto
- Tests de casos edge: +1 punto
- Optimizaciones significativas: +2 puntos

## 🎯 Customización

### Crear Rúbricas Personalizadas

```bash
# Copiar rúbrica base
cp rubrics/code-review-rubric.md rubrics/mi-rubrica.md

# Editar según necesidades del proyecto
# Luego usar con:
./review.sh --rubric mi-rubrica.md
```

### Personalizar Templates

```bash
# Editar template principal
nano templates/report-template.md

# O crear template personalizado
cp templates/report-template.md templates/mi-template.md
```

### Variables de Configuración

Edita `config/config.sh` para personalizar:

```bash
# Modelo de Claude a usar
CLAUDE_MODEL="claude-3-5-sonnet-20241022"

# Puntuación mínima para aprobar
MIN_PASSING_SCORE="7"

# Branch por defecto
DEFAULT_BRANCH="main"

# Formato de salida
OUTPUT_FORMAT="markdown"
```

## 🧪 Testing

### Probar con la Aplicación de Ejemplo

```bash
# Ir a la aplicación de prueba
cd test-application

# Hacer algunos cambios manualmente
echo "// Test comment" >> src/app/page.tsx

# Commit los cambios
git add .
git commit -m "Test changes for PR review"

# Ejecutar revisión manual
cd ../scripts
./review.sh --debug
```

### Casos de Prueba Recomendados

Para probar diferentes escenarios, puedes crear manualmente:

1. **Sin cambios**: Verificar que maneja repos limpios
2. **Cambios menores**: Modificar archivos CSS o documentación
3. **Cambios mayores**: Actualizar lógica de negocio o APIs  
4. **Problemas de seguridad**: Agregar credentials hardcodeadas temporalmente
5. **Performance**: Crear queries ineficientes o memory leaks

Recuerda hacer commit de los cambios antes de ejecutar `./review.sh`

## 📁 Estructura de Reportes

Los reportes generados incluyen:

- **Resumen ejecutivo** con puntuación final
- **Puntuación detallada** por categorías
- **Análisis por archivo** modificado
- **Señales de alerta** detectadas
- **Bonificaciones** otorgadas
- **Recomendaciones específicas** de mejora
- **Próximos pasos** sugeridos

## 🔧 Troubleshooting

### Problemas Comunes

**Error: CLAUDE_API_KEY no está configurado**
```bash
export CLAUDE_API_KEY="tu-clave-api"
```

**Error: jq no encontrado**
```bash
# macOS
brew install jq
# Linux
sudo apt-get install jq
```

**Error: No hay cambios para revisar**
```bash
# Verificar que hay commits después de la branch base
git log main..HEAD
```

**Error: Branch objetivo no existe**
```bash
# Verificar branches disponibles
git branch -a
# Usar branch existente
./review.sh --branch develop
```

### Modo Debug

```bash
# Activar debug para diagnósticos
./review.sh --debug --verbose

# Ver logs detallados
DEBUG_MODE=true VERBOSE=true ./review.sh
```

## 🤖 Integración con GitHub Actions

### Revisión Automática de PRs

El sistema incluye workflows de GitHub Actions para automatizar completamente las revisiones:

```bash
# Configuración rápida
1. Agregar CLAUDE_API_KEY como secret en GitHub
2. Los PRs se revisarán automáticamente
3. Comentarios y status checks aparecen automáticamente
```

### Workflows Disponibles

- **🔍 PR Review** - Revisión automática en cada PR
- **🔧 Setup & Test** - Configuración y pruebas manuales  
- **🔄 Manual Review** - Revisión manual bajo demanda

Ver [GitHub Setup Guide](.github/SETUP.md) para configuración completa.

## 🚀 Roadmap

### ✅ Funcionalidades Completadas

- ✅ Integración directa con GitHub APIs
- ✅ Comentarios automáticos en PRs
- ✅ Webhooks para revisión automática (GitHub Actions)
- ✅ Status checks automáticos
- ✅ Artifacts de reportes

### Próximas Funcionalidades

- [ ] Dashboard web para métricas
- [ ] Soporte para más lenguajes
- [ ] Cache de análisis previos
- [ ] Integración con GitLab
- [ ] Integración con otros CI/CD pipelines

### Mejoras Planeadas

- [ ] Análisis incremental de cambios
- [ ] Métricas históricas por desarrollador
- [ ] Rúbricas específicas por framework
- [ ] Reportes en múltiples formatos (HTML, PDF)
- [ ] Configuración por proyecto (.reviewrc)

## 🤝 Contribución

Este es un proyecto en desarrollo activo. Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crear branch para feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para detalles.

## 🙋 Soporte

Para preguntas, problemas o sugerencias:

- Crear un issue en el repositorio
- Revisar la documentación en `/docs`
- Consultar troubleshooting guide

---

**¡Disfruta revisando código de forma automática! 🚀**
