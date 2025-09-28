# 🔍 Pull Request Reviewer

Automated code review system using Claude AI to analyze pull requests and generate detailed reports based on customizable rubrics.

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
