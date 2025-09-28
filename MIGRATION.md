# 🔄 Migración de Bash a TypeScript - Guía Completa

## ✅ Cambios Realizados

### 📁 Archivos Eliminados
- `scripts/review.sh` - Script principal en Bash
- `scripts/utils.sh` - Utilidades en Bash  
- `scripts/config/config.sh` - Configuración en Bash
- `scripts/.env.example` - Duplicado (mantenido en raíz)

### 🆕 Archivos Nuevos
- `src/` - Directorio con código TypeScript
- `dist/` - Directorio compilado (generado automáticamente)
- `package.json` - Dependencias y scripts NPM
- `tsconfig.json` - Configuración TypeScript
- `.prettierrc` - Configuración Prettier
- `.eslintrc.js` - Configuración ESLint
- `Dockerfile` - Para contenedores Docker
- `docker-compose.yml` - Para desarrollo local

### 🔧 GitHub Actions Actualizados
- `.github/workflows/pr-review.yml` - Usa `npm run start` en lugar de `./review.sh`
- `.github/workflows/manual-review.yml` - Usa `npm run start` en lugar de `./review.sh`

## 🚀 Cómo Usar la Nueva Versión

### Instalación
```bash
npm install
```

### Configuración
```bash
cp .env.example .env
# Editar .env y agregar tu CLAUDE_API_KEY
```

### Comandos Disponibles
```bash
# Desarrollo (sin compilar)
npm run dev

# Producción (compilado)
npm run build
npm run start

# Revisión directa (modo dev)
npm run review

# Con opciones
npm run review -- --branch develop --debug

# Linting y formato
npm run lint
npm run format
```

### Docker (Opcional)
```bash
# Construir imagen
docker build -t pr-reviewer .

# Usar con docker-compose
docker-compose up
```

## 🔗 Comandos Equivalentes

| Bash (Antiguo) | TypeScript (Nuevo) |
|-----------------|-------------------|
| `./scripts/review.sh` | `npm run review` |
| `./scripts/review.sh --branch develop` | `npm run review -- --branch develop` |
| `./scripts/review.sh --debug` | `npm run review -- --debug` |
| `chmod +x scripts/review.sh` | ❌ Ya no necesario |

## 📋 Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `CLAUDE_API_KEY` | API Key de Claude | ✅ Sí |
| `DEBUG_MODE` | Modo debug (true/false) | ❌ No |
| `VERBOSE` | Modo verbose (true/false) | ❌ No |

## 🎯 Beneficios de la Migración

### ✅ Ventajas Técnicas
- **Mejor manejo de errores**: TypeScript + SDK oficial
- **Menos dependencias del sistema**: Solo Node.js
- **Mejor debugging**: Source maps y stack traces
- **Testing más fácil**: Arquitectura modular
- **Mantenimiento**: Código estructurado en clases

### ✅ Ventajas Operativas
- **CI/CD mejorada**: Workflows actualizados
- **Docker support**: Contenedores opcionales
- **Mejor documentación**: README actualizado
- **Configuración centralizada**: Un solo .env

## 🔍 Troubleshooting

### Error: "Cannot find module '@anthropic-ai/sdk'"
```bash
npm install
```

### Error: "CLAUDE_API_KEY environment variable is required"
```bash
cp .env.example .env
# Editar .env y agregar tu API key
```

### Error: "Not in a git repository"
- Asegúrate de estar en un repositorio Git
- Verifica que el branch objetivo existe

### GitHub Actions fallan
- Verifica que el secret `CLAUDE_API_KEY` esté configurado
- Verifica permisos de escritura en workflows

## 📚 Estructura del Proyecto

```
├── src/              # Código TypeScript
│   ├── index.ts      # Punto de entrada
│   ├── types.ts      # Tipos y interfaces
│   ├── logger.ts     # Sistema de logging
│   ├── git.ts        # Operaciones Git
│   ├── claude.ts     # Cliente Claude AI
│   └── report.ts     # Generador de reportes
├── scripts/          # Recursos (rúbricas, templates, output)
├── dist/             # Código JavaScript compilado
├── .env.example      # Configuración de ejemplo
└── package.json      # Dependencias NPM
```

---

**✨ ¡Migración completada exitosamente!**

Tu sistema de revisión de PRs ahora utiliza TypeScript con el SDK oficial de Anthropic, proporcionando mejor confiabilidad, mantenibilidad y experiencia de desarrollo.
