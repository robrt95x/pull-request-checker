# 🔧 GitHub Setup Guide for PR Reviewer

## Quick Setup Checklist

- [ ] **1. Configure Claude API Key**
- [ ] **2. Set repository permissions**
- [ ] **3. Test the workflows**
- [ ] **4. Customize settings (optional)**

---

## 1. 🔑 Configure Claude API Key

### Step 1: Get your Claude API Key

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Go to **API Keys** section
4. Click **Create Key**
5. Copy your API key (starts with `sk-`)

### Step 2: Add secret to GitHub repository

1. Go to your GitHub repository
2. Click **Settings** tab
3. In the sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `CLAUDE_API_KEY`
6. Value: Your Claude API key
7. Click **Add secret**

```bash
# Your secret should look like this:
# Name: CLAUDE_API_KEY
# Value: sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 2. ⚙️ Repository Permissions

### Required Permissions

The workflows need these permissions (usually enabled by default):

- ✅ **Actions**: Read and write
- ✅ **Contents**: Read
- ✅ **Issues**: Write
- ✅ **Pull requests**: Write
- ✅ **Metadata**: Read

### Check Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - 🔘 **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

---

## 3. 🧪 Test the Setup

### Automatic Test (Recommended)

1. Go to **Actions** tab in your repository
2. Find **"🔧 Setup PR Reviewer"** workflow
3. Click **Run workflow**
4. Select test scenario: `clean`
5. Click **Run workflow** button
6. Wait for completion and check results

### Testing Manual

1. Ve a la pestaña **Actions** en tu repositorio
2. Selecciona el workflow **"🔄 Manual PR Review"** 
3. Haz clic en **"Run workflow"**
4. Ingresa el número del PR que quieres revisar
5. Ejecuta y revisa los resultados

---

## 4. 🎯 Customization Options

### Branch Protection (Recommended)

Set up branch protection to require PR reviews:

1. Go to **Settings** → **Branches**
2. Click **Add rule** for your main branch
3. Enable:
   - ✅ **Require status checks to pass**
   - ✅ Select: `pr-reviewer/automated-review`
   - ✅ **Require branches to be up to date**

### Custom Configuration

Edit `.github/workflows/pr-review.yml` to customize:

```yaml
# Trigger on specific branches only
on:
  pull_request:
    branches: [main, develop]  # Add your branches

# Use custom rubric
- name: 🔍 Run PR Review Analysis
  run: |
    ./review.sh --rubric "my-custom-rubric.md"
```

### Notification Setup (Optional)

Add team notifications:

```yaml
- name: 📬 Notify team
  if: steps.review.outputs.final_score < 7
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: "PR #${{ github.event.pull_request.number }} needs attention (Score: ${{ steps.review.outputs.final_score }}/10)"
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 🚀 Usage Examples

### For Team Leads

```bash
# Set minimum score requirement
MIN_PASSING_SCORE=8

# Require specific rubrics for different areas
- Frontend PRs: frontend-rubric.md
- Backend PRs: backend-rubric.md
- Database PRs: database-rubric.md
```

### For Developers

```bash
# Test locally before pushing
cd scripts
export CLAUDE_API_KEY="your-key"
./review.sh --debug

# Create specific test changes manually
# Add security issues, performance problems, etc.
# Then run: ./review.sh
```

---

## 🔍 Troubleshooting

### Common Issues

**❌ "Secret CLAUDE_API_KEY is not set"**
- Double-check secret name (case-sensitive)
- Verify you added it to the correct repository
- Forks don't inherit secrets by default

**❌ "Workflow permissions error"**
- Check repository permissions in Settings → Actions
- Enable "Read and write permissions"

**❌ "Review failed to run"**
- Check workflow logs in Actions tab
- Verify all required files exist in scripts/
- Ensure jq dependency is available

**❌ "No changes to review"**
- Normal if PR only contains documentation
- Workflow will skip analysis automatically

### Getting Help

1. **Check workflow logs**: Actions tab → Failed workflow → View details
2. **Review documentation**: [Main README](../README.md)
3. **Test manually**: Run `./scripts/review.sh --debug` locally
4. **Create issue**: Use GitHub issues for bug reports

---

## 📊 Expected Results

### Successful Setup

After successful setup, you should see:

✅ **In Pull Requests:**
- Automatic comment with review results
- Status check showing pass/fail
- Detailed analysis in collapsible section

✅ **In Actions:**
- Green checkmarks on successful runs
- Artifacts with full reports
- Job summaries with key metrics

✅ **In Notifications:**
- Status updates on PR status
- Team notifications (if configured)

### Sample Output

```markdown
## 🌟 Revisión Automática de PR #123

**Puntuación Final:** 8.5/10
**Estado:** APROBADO

---

📋 Ver Reporte Completo de Revisión (click to expand)
[Detailed analysis with scores, recommendations, and action items]

🤖 Reporte generado automáticamente por PR Reviewer
```

---

## 🎉 You're All Set!

Your PR Reviewer is now configured and ready to automatically review Pull Requests!

**Next Steps:**
- Create a test PR to see it in action
- Customize rubrics for your project needs
- Set up team notifications if desired
- Review and adjust minimum score requirements

**Happy Reviewing! 🚀**
