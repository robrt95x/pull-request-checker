# � Migration to Claude Code GitHub Actions

This repository has been migrated from a CLI-based code review tool to use Claude Code GitHub Actions for automated code reviews directly in GitHub.

## �🔄 What Changed

### Before (CLI Tool)
- Manual execution: `npm run review`
- Local analysis of git diffs
- Generated static reports in `/output`
- Required manual setup and API keys

### After (Claude Code GitHub Actions)
- **Automatic**: Runs on every PR automatically
- **Interactive**: Respond to `@claude` mentions in comments
- **Integrated**: Reviews appear as PR comments
- **Real-time**: Instant feedback in GitHub interface

## ⚙️ Setup Instructions

### 1. Install Claude GitHub App
Choose one of these methods:

#### Option A: Quick Setup (Recommended)
1. Open your terminal and run `claude`
2. Execute `/install-github-app`
3. Follow the guided setup process

#### Option B: Manual Setup
1. Install the Claude app: [https://github.com/apps/claude](https://github.com/apps/claude)
2. Add your `ANTHROPIC_API_KEY` to repository secrets:
   - Go to Repository Settings → Secrets and variables → Actions
   - Add new secret: `ANTHROPIC_API_KEY` with your Claude API key

### 2. Enable GitHub Actions
The workflows are already configured in `.github/workflows/`:
- `claude-review.yml` - Automatic review on PR creation/updates
- `security-review.yml` - Focused security analysis  
- `claude-interactive.yml` - Interactive responses to @claude mentions

## 🎯 How to Use

### Automatic Reviews
- **Trigger**: Opens automatically when you create or update a PR
- **Output**: Detailed review comment with scores and recommendations
- **Format**: Follows the same rubric structure as before

### Interactive Commands
Comment on any PR or issue with:

```
@claude /review
```
Performs a complete code review with detailed scoring

```
@claude /security  
```
Focuses on security analysis only

```
@claude /performance
```
Analyzes performance aspects

```
@claude fix the authentication bug in user.js
```
Creates a PR with the fix

```
@claude how should I implement caching for this API?
```
Provides implementation guidance

### Custom Analysis
```
@claude analyze this code for React best practices
@claude check if this database schema is optimized
@claude review the error handling in these functions
```

## 📋 Review Format

Claude will provide structured reviews following this format:

```
## 📊 Code Review Summary
**Final Score: 8.2/10**
**Status: APPROVED**

### Category Scores  
- 🔧 Code Quality: 8/10 (Weight: 25%)
- 🏗️ Architecture: 9/10 (Weight: 20%)
- 🔒 Security: 7/10 (Weight: 20%)
- 🧪 Testing: 8/10 (Weight: 15%)
- 📚 Documentation: 9/10 (Weight: 10%)
- ⚡ Performance: 8/10 (Weight: 10%)

### Modifiers
- 🚨 Alert Signals: -1 point (hardcoded API key)
- ⭐ Bonuses: +0.5 points (excellent documentation)

## 🔍 Detailed Analysis
[Detailed feedback for each category...]

## 📋 Recommendations
1. Move API key to environment variables
2. Add integration tests for payment flow
3. Consider implementing request caching
```

## 🔧 Configuration

### CLAUDE.md
The `CLAUDE.md` file contains all the review rubrics and instructions that Claude follows. This replaces the old CLI prompts and maintains the same quality standards.

### Customization
You can modify `CLAUDE.md` to:
- Adjust scoring criteria
- Add project-specific standards  
- Include new alert signals or bonuses
- Change response format

## 🆚 Comparison with CLI Tool

| Feature | CLI Tool | Claude Code Actions |
|---------|----------|-------------------|
| **Execution** | Manual | Automatic |
| **Integration** | External reports | Native GitHub comments |
| **Real-time** | No | Yes |
| **Interactive** | No | Yes with @claude |
| **Setup complexity** | High | Low |
| **Maintenance** | Self-maintained | Anthropic-maintained |
| **Customization** | Full control | CLAUDE.md configuration |
| **Report format** | Custom templates | Markdown comments |

## 🚨 Important Notes

### Costs
- **GitHub Actions**: Uses your GitHub Actions minutes
- **Claude API**: Each review consumes API tokens
- **Optimization**: Use specific commands to reduce unnecessary calls

### Security
- API keys are stored as GitHub Secrets (encrypted)
- Never commit API keys to the repository
- Claude runs in isolated GitHub runners

### Limitations
- Maximum workflow run time: 6 hours
- Token limits apply per API call
- Dependent on GitHub Actions availability

## 🔄 Rollback Plan

If you need to revert to the CLI tool:
1. The original source code is preserved in `/src`
2. Package.json scripts still work: `npm run review`
3. Simply disable the GitHub Actions workflows

## 📈 Benefits of Migration

✅ **Zero maintenance** - No need to update dependencies or fix bugs
✅ **Always up-to-date** - Latest Claude models automatically
✅ **Team collaboration** - Everyone sees reviews in GitHub
✅ **Faster feedback** - Instant reviews on PR creation
✅ **Interactive help** - Ask Claude questions anytime with @claude
✅ **Multiple workflows** - Security, performance, general reviews
✅ **Scalable** - Works for any number of repositories

## 🎓 Learning Resources

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Best Practices for Code Review](https://docs.claude.com/en/docs/claude-code/best-practices)

---

**Migration completed on**: September 28, 2025
**Old CLI tool**: Preserved for reference and rollback

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
