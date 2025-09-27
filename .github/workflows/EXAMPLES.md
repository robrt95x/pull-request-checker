# 🔧 Advanced GitHub Actions Configuration Examples

Este archivo contiene ejemplos de configuraciones avanzadas para los workflows de GitHub Actions.

## 📋 Configuraciones por Tipo de Proyecto

### Frontend Projects (React/Next.js/Vue)

```yaml
# .github/workflows/pr-review-frontend.yml
name: 🎨 Frontend PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - 'src/**'
      - 'components/**'
      - 'pages/**'
      - 'styles/**'
      - '**.tsx'
      - '**.jsx'
      - '**.vue'

jobs:
  frontend-review:
    name: 🎨 Frontend Code Review
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      
      - name: 🔍 Run Frontend-Specific Review
        run: |
          cd scripts
          ./review.sh \
            --rubric "frontend-rubric.md" \
            --output "frontend_review_${{ github.event.pull_request.number }}.md"
      
      # Focus on accessibility and performance
      - name: 🌐 Accessibility Check
        run: |
          # Add custom accessibility checks
          echo "Checking for a11y compliance..."
```

### Backend Projects (APIs/Services)

```yaml
# .github/workflows/pr-review-backend.yml
name: 🔧 Backend PR Review

on:
  pull_request:
    paths:
      - 'api/**'
      - 'services/**'
      - 'models/**'
      - 'controllers/**'
      - '**.py'
      - '**.java'
      - '**.go'

jobs:
  backend-review:
    name: 🔧 Backend Code Review
    runs-on: ubuntu-latest
    steps:
      - name: 🔍 Run Backend-Specific Review
        run: |
          cd scripts
          ./review.sh \
            --rubric "backend-rubric.md" \
            --output "backend_review_${{ github.event.pull_request.number }}.md"
      
      # Additional security scans
      - name: 🔒 Security Audit
        run: |
          # Add security scanning tools
          echo "Running security audit..."
```

## 🎯 Configuraciones por Equipo

### Para Equipos Grandes

```yaml
# Configuración para múltiples reviewers
env:
  CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
  MIN_SCORE_FOR_AUTO_MERGE: 9
  REQUIRE_MANUAL_REVIEW_BELOW: 7

jobs:
  team-review:
    strategy:
      matrix:
        reviewer-type: [security, performance, architecture]
    
    steps:
      - name: 🔍 Specialized Review
        run: |
          case "${{ matrix.reviewer-type }}" in
            security)
              rubric="security-focused-rubric.md"
              ;;
            performance)
              rubric="performance-rubric.md"
              ;;
            architecture)
              rubric="architecture-rubric.md"
              ;;
          esac
          
          ./review.sh --rubric "$rubric"
```

### Para Startups/Equipos Pequeños

```yaml
# Configuración ligera y rápida
env:
  CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
  SKIP_DOCS_ONLY_PRS: true

jobs:
  quick-review:
    if: |
      !contains(github.event.pull_request.title, '[docs]') &&
      !contains(github.event.pull_request.title, '[skip-review]')
    
    steps:
      - name: 🚀 Quick Review
        run: |
          ./review.sh --rubric "startup-quick-rubric.md"
```

## 🔄 Configuraciones por Branch

### Branch-Specific Rules

```yaml
name: 📋 Branch-Specific PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  branch-specific-review:
    runs-on: ubuntu-latest
    steps:
      - name: 🎯 Determine Review Type
        id: review-config
        run: |
          case "${{ github.event.pull_request.base.ref }}" in
            main|master)
              echo "rubric=production-rubric.md" >> $GITHUB_OUTPUT
              echo "min_score=8" >> $GITHUB_OUTPUT
              echo "strict_mode=true" >> $GITHUB_OUTPUT
              ;;
            develop)
              echo "rubric=development-rubric.md" >> $GITHUB_OUTPUT
              echo "min_score=6" >> $GITHUB_OUTPUT
              echo "strict_mode=false" >> $GITHUB_OUTPUT
              ;;
            staging)
              echo "rubric=staging-rubric.md" >> $GITHUB_OUTPUT
              echo "min_score=7" >> $GITHUB_OUTPUT
              echo "strict_mode=true" >> $GITHUB_OUTPUT
              ;;
          esac
      
      - name: 🔍 Run Branch-Specific Review
        run: |
          cd scripts
          ./review.sh \
            --rubric "${{ steps.review-config.outputs.rubric }}" \
            --min-score "${{ steps.review-config.outputs.min_score }}"
```

## 📊 Integración con Servicios Externos

### Slack Notifications

```yaml
- name: 📬 Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    custom_payload: |
      {
        text: "PR Review Complete",
        attachments: [{
          color: '${{ steps.review.outputs.final_score >= 7 && "good" || "danger" }}',
          fields: [{
            title: "PR #${{ github.event.pull_request.number }}",
            value: "${{ github.event.pull_request.title }}",
            short: true
          }, {
            title: "Score",
            value: "${{ steps.review.outputs.final_score }}/10",
            short: true
          }, {
            title: "Author",
            value: "${{ github.event.pull_request.user.login }}",
            short: true
          }]
        }]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Microsoft Teams

```yaml
- name: 📢 Teams Notification
  if: steps.review.outputs.final_score < 7
  uses: skitionek/notify-microsoft-teams@master
  with:
    webhook_url: ${{ secrets.MS_TEAMS_WEBHOOK_URL }}
    title: "🚨 PR Needs Attention"
    message: |
      PR #${{ github.event.pull_request.number }} scored ${{ steps.review.outputs.final_score }}/10
      
      **Title:** ${{ github.event.pull_request.title }}
      **Author:** ${{ github.event.pull_request.user.login }}
      **Status:** ${{ steps.review.outputs.review_status }}
      
      [View PR](${{ github.event.pull_request.html_url }})
```

### Jira Integration

```yaml
- name: 🎫 Update Jira Issue
  if: contains(github.event.pull_request.title, 'PROJ-')
  run: |
    # Extract Jira issue key from PR title
    issue_key=$(echo "${{ github.event.pull_request.title }}" | grep -o 'PROJ-[0-9]\+')
    
    # Update Jira issue with review results
    curl -X PUT \
      -H "Authorization: Basic ${{ secrets.JIRA_AUTH }}" \
      -H "Content-Type: application/json" \
      "https://your-domain.atlassian.net/rest/api/3/issue/$issue_key" \
      -d '{
        "fields": {
          "customfield_10001": "Code Review Score: ${{ steps.review.outputs.final_score }}/10"
        }
      }'
```

## 🔒 Security-First Configuration

### High-Security Projects

```yaml
name: 🔒 Security-First PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  security-review:
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval
    
    steps:
      - name: 🔒 Security Scan
        run: |
          # Run security-focused analysis
          cd scripts
          ./review.sh \
            --rubric "security-first-rubric.md" \
            --min-score 8
      
      - name: 🛡️ Secrets Detection
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
      
      - name: 🚨 Block on Security Issues
        if: steps.review.outputs.final_score < 8
        run: |
          echo "::error::Security review failed. Score: ${{ steps.review.outputs.final_score }}/10"
          exit 1
```

## ⚡ Performance Optimizations

### Fast Review for Large Repos

```yaml
name: ⚡ Fast PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  fast-review:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # Quick timeout
    
    steps:
      - name: 📁 Selective Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 1  # Shallow clone
          sparse-checkout: |
            scripts/
            src/
            !node_modules
            !.git
      
      - name: 🔍 Quick Review
        run: |
          # Only analyze changed files
          changed_files=$(git diff --name-only HEAD~1)
          if [ -z "$changed_files" ]; then
            echo "No files to review"
            exit 0
          fi
          
          cd scripts
          ./review.sh --quick-mode
```

## 📈 Analytics and Metrics

### Advanced Metrics Collection

```yaml
- name: 📊 Collect Metrics
  run: |
    # Send metrics to DataDog
    curl -X POST "https://api.datadoghq.com/api/v1/series" \
      -H "Content-Type: application/json" \
      -H "DD-API-KEY: ${{ secrets.DATADOG_API_KEY }}" \
      -d '{
        "series": [
          {
            "metric": "pr_reviewer.score",
            "points": [['$(date +%s)', ${{ steps.review.outputs.final_score }}]],
            "tags": [
              "repository:${{ github.repository }}",
              "author:${{ github.event.pull_request.user.login }}",
              "branch:${{ github.event.pull_request.base.ref }}"
            ]
          }
        ]
      }'
    
    # Send to custom analytics
    curl -X POST "${{ secrets.ANALYTICS_ENDPOINT }}" \
      -H "Authorization: Bearer ${{ secrets.ANALYTICS_TOKEN }}" \
      -d '{
        "event": "pr_review_completed",
        "properties": {
          "score": ${{ steps.review.outputs.final_score }},
          "repository": "${{ github.repository }}",
          "pr_number": ${{ github.event.pull_request.number }},
          "author": "${{ github.event.pull_request.user.login }}"
        }
      }'
```

## 🎨 Custom Templates

### Dynamic Report Templates

```yaml
- name: 📝 Generate Custom Report
  run: |
    cd scripts
    
    # Select template based on PR characteristics
    if [[ "${{ github.event.pull_request.title }}" =~ ^feat ]]; then
      template="feature-report-template.md"
    elif [[ "${{ github.event.pull_request.title }}" =~ ^fix ]]; then
      template="bugfix-report-template.md"
    elif [[ "${{ github.event.pull_request.title }}" =~ ^refactor ]]; then
      template="refactor-report-template.md"
    else
      template="report-template.md"
    fi
    
    ./review.sh --template "$template"
```

## 🔄 Multi-Stage Reviews

### Progressive Review Process

```yaml
name: 🔄 Multi-Stage PR Review

jobs:
  stage-1-quick:
    name: 🚀 Stage 1 - Quick Check
    runs-on: ubuntu-latest
    outputs:
      passed: ${{ steps.quick.outputs.passed }}
    steps:
      - name: ⚡ Quick Analysis
        id: quick
        run: |
          cd scripts
          if ./review.sh --quick --min-score 5; then
            echo "passed=true" >> $GITHUB_OUTPUT
          else
            echo "passed=false" >> $GITHUB_OUTPUT
          fi
  
  stage-2-detailed:
    name: 🔍 Stage 2 - Detailed Review
    needs: stage-1-quick
    if: needs.stage-1-quick.outputs.passed == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: 📋 Full Analysis
        run: |
          cd scripts
          ./review.sh --detailed --min-score 7
```

---

**💡 Tip:** Combina múltiples configuraciones según las necesidades de tu proyecto. Empieza simple y agrega funcionalidades según vayas necesitando más control y automatización.
