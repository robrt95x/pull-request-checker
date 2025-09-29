# Claude PR Review Configuration

## Your Task
1. Run: `gh pr diff [PR_NUMBER]` and `gh pr view [PR_NUMBER]`
2. Review code using the rubric below
3. Create file: `check-results.md` with your complete analysis
4. Post PR comment with summary using: `gh pr comment [PR_NUMBER] --body "$(head -20 check-results.md)"`

## File Format for check-results.md
Your check-results.md file must follow this EXACT structure:

## Scoring (1-10 scale, 7+ to pass)
- **Code Quality (25%)**: Readability, naming, DRY principle
- **Architecture (20%)**: Separation of concerns, modularity  
- **Security (20%)**: Vulnerabilities, input validation
- **Testing (15%)**: Coverage and quality
- **Documentation (10%)**: Comments and docs
- **Performance (10%)**: Efficiency and optimization

## Alert Signals (Deductions)
- eval() usage: -8 points
- Hard-coded credentials: -5 points
- Memory leaks: -5 points
- Missing error handling: -3 points
- SQL injection: -8 points

## Response Format (MANDATORY)
```
## 📊 Code Review Summary

**Final Score: X.X/10**
**Status: [APPROVED/REQUIRES CHANGES/NEEDS MAJOR REVISION]**

### Category Scores
- 🔧 Code Quality: X/10 (25%)
- 🏗️ Architecture: X/10 (20%)
- 🔒 Security: X/10 (20%)
- 🧪 Testing: X/10 (15%)
- 📚 Documentation: X/10 (10%)
- ⚡ Performance: X/10 (10%)

### Alert Signals: -X points
### Critical Issues
[List major problems]

### Recommendations
1. [Specific action item]
2. [Another action item]
```

## Important Notes
- Create the complete analysis in `check-results.md` file
- Post only a summary (first 20 lines) as PR comment
- NO individual file comments or inline comments
- Use exact format above for consistency
