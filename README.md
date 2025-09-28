# 🔍 Pull Request Reviewer with Claude Code

Advanced automated code review system using Claude Code GitHub Actions to analyze pull requests and provide detailed feedback based on customizable rubrics.

> **🚀 NEW**: Now integrated with Claude Code GitHub Actions for automatic reviews!

## 🌟 Features

- **🤖 Automatic Reviews**: Runs automatically on every PR
- **💬 Interactive**: Respond to `@claude` mentions for instant help  
- **📊 Structured Scoring**: Detailed rubric-based analysis (1-10 scale)
- **🔒 Security Focus**: Specialized security vulnerability detection
- **⚡ Performance Analysis**: Code performance and optimization suggestions  
- **📚 Documentation Checks**: Ensures proper code documentation
- **🏗️ Architecture Review**: Evaluates design patterns and structure
- **🧪 Testing Coverage**: Analyzes test quality and coverage

## 🚀 Quick Start

### 1. Setup (One-time)
```bash
# Install Claude GitHub App to your repository
# Visit: https://github.com/apps/claude

# Add your Claude API key to repository secrets:
# Repository Settings → Secrets → New secret
# Name: ANTHROPIC_API_KEY
# Value: your-claude-api-key
```

### 2. Use Automatic Reviews
- Create or update any Pull Request
- Claude automatically analyzes and comments with detailed review
- Get instant feedback with scores and recommendations

### 3. Interactive Commands
Comment on any PR or issue:
```
@claude /review
```
Get complete code review with detailed scoring

```
@claude /security
```
Focus on security analysis

```
@claude /performance  
```
Analyze performance aspects

```
@claude fix the memory leak in utils.js
```
Get a PR with the fix

```
@claude how should I optimize this database query?
```
Get implementation guidance

## 📊 Review Format

Every review follows this structured format:

```markdown
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
- 🚨 Alert Signals: -1 point
- ⭐ Bonuses: +0.5 points

## 🔍 Detailed Analysis
[Category-by-category breakdown...]

## 📋 Recommendations
1. [Specific actionable items]
```

## 📋 Requirements

- Node.js 18+
- Git
- Claude API Key (Anthropic)

## ⚙️ Installation

```bash
git clone https://github.com/your-username/pull-request-reviewer.git
cd pull-request-reviewer
npm install
```

## 🎯 Usage

### Setup
```bash
cp .env.example .env
# Add your CLAUDE_API_KEY to .env
```

### Basic Review
```bash
npm run review
```

### Custom Options
```bash
npm run review -- --branch develop --rubric custom-rubric.md --debug
```

### Development
```bash
npm run dev    # Run without compilation
npm run build  # Compile TypeScript
```

## 📖 Options

| Option | Description | Default |
|--------|-------------|---------|
| `-b, --branch` | Target branch to compare | `main` |
| `-r, --rubric` | Rubric file to use | `code-review-rubric.md` |
| `-o, --output` | Custom output filename | Auto-generated |
| `-d, --debug` | Enable debug mode | `false` |
| `-v, --verbose` | Enable verbose mode | `false` |

## 🤖 GitHub Actions

### Automatic PR Review
- **Trigger**: Runs on PRs to `main`, `master`, `develop`
- **Setup**: Add `CLAUDE_API_KEY` to repository secrets
- **Workflow**: `.github/workflows/pr-review.yml`

### Manual Review
- **Trigger**: Manual execution from GitHub Actions
- **Workflow**: `.github/workflows/manual-review.yml`

## 🏗️ Project Structure

```
├── src/              # TypeScript source code
├── config/           # Rubrics and templates
│   ├── rubrics/      # Evaluation rubrics
│   └── templates/    # Report templates
├── output/           # Generated reports
├── .github/          # GitHub Actions workflows
└── dist/             # Compiled JavaScript
```

## 📄 License

MIT License
