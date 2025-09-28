# 🔍 Pull Request Reviewer with Claude Code

Advanced automated code review system using Claude Code GitHub Actions to analyze pull requests and provide detailed feedback based on customizable rubrics.

> **🚀 NEW**: Now fully integrated with Claude Code GitHub Actions!

## 🌟 Features

- **🤖 Automatic Reviews**: Runs automatically on every PR using Claude Code
- **💬 Interactive**: Respond to `@claude` mentions for instant help  
- **📊 Structured Scoring**: Detailed rubric-based analysis (1-10 scale)
- **🔒 Security Focus**: Specialized security vulnerability detection
- **⚡ Performance Analysis**: Code performance and optimization suggestions  
- **📚 Documentation Checks**: Ensures proper code documentation
- **🏗️ Architecture Review**: Evaluates design patterns and structure
- **🧪 Testing Coverage**: Analyzes test quality and coverage
- **📄 Report Generation**: Automatically generates detailed review artifacts

## 🚀 Quick Setup

### 1. Install Claude Code App
```bash
# Install the Claude GitHub App to your repository
# Visit: https://github.com/apps/claude-code
# Click "Configure" and select your repository
```

### 2. Add API Key to Secrets
```bash
# In your GitHub repository:
# 1. Go to Settings → Secrets and variables → Actions
# 2. Click "New repository secret"
# 3. Name: ANTHROPIC_API_KEY
# 4. Value: your-claude-api-key
```

### 3. That's it! 🎉
- Create or update any Pull Request
- Claude automatically analyzes and comments with detailed review
- Get instant feedback with scores and actionable recommendations

## 📋 How It Works

1. **Automatic Trigger**: When you open/update a PR, Claude Code automatically runs
2. **Rubric-Based Analysis**: Analyzes code using the detailed rubric in `CLAUDE.md`
3. **Detailed Feedback**: Provides scores (1-10) across 6 categories:
   - 🔧 Code Quality (25% weight)
   - 🏗️ Architecture & Design (20% weight) 
   - 🔒 Security (20% weight)
   - 🧪 Testing (15% weight)
   - 📚 Documentation (10% weight)
   - ⚡ Performance (10% weight)
4. **Actionable Reports**: Generates comprehensive reports as artifacts
5. **Line-by-Line Comments**: Provides specific feedback on problematic code sections

## 🎯 Interactive Commands

Comment on any PR to trigger specific analyses:

```
@claude /review
```
→ Complete code review with detailed scoring

```
@claude /security  
```
→ Focus specifically on security analysis

```
@claude /performance
```
→ Analyze performance bottlenecks and optimizations

```
@claude /fix [issue]
```
→ Get suggestions to fix specific issues

## ⚙️ Configuration

The review rubric and scoring system is defined in [`CLAUDE.md`](CLAUDE.md). You can customize:

- **Scoring thresholds** (minimum score to approve: 7/10)
- **Category weights** (Code Quality: 25%, Security: 20%, etc.)
- **Alert signals** (automatic deductions for security issues)
- **Bonus criteria** (extra points for excellence)

## 📊 Review Output

Each review includes:

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

## 📁 File Analysis
**src/api/users.js**: 7/10 - Good structure, needs input validation
**src/utils/helpers.js**: 9/10 - Excellent utility functions
```

## 🔄 Migration from Custom Code

This project has been simplified from a custom TypeScript implementation to use Claude Code:

- ✅ **Simpler setup**: No more complex builds or deployments
- ✅ **Better integration**: Native GitHub integration with line comments
- ✅ **Auto-updates**: Claude Code stays updated automatically
- ✅ **Enhanced features**: Better diff analysis and artifact generation

## 📄 Files Structure

```
├── .github/workflows/
│   └── claude-review.yml     # Main workflow file
├── config/
│   ├── rubrics/
│   │   └── code-review-rubric.md
│   └── templates/
│       └── report-template.md
├── CLAUDE.md                 # Main configuration & rubric
└── README.md                 # This file
```

## 🤝 Contributing

1. Fork the repository
2. Make changes to the rubric in `CLAUDE.md` or workflow configuration
3. Test with a sample PR
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your projects!

---

**⚡ Powered by Claude Code** - Making code reviews faster, more consistent, and more insightful.
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
