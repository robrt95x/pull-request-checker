# Claude PR Review Configuration

## Your Task
1. Run: `gh pr diff [PR_NUMBER]` and `gh pr view [PR_NUMBER]`
2. Review code using the rubric below
3. Create file: `check-results.md` with complete analysis (MUST include line numbers)
4. Post PR comment with summary + artifact download link

## CRITICAL: Line Number Requirements
- For EVERY feedback item, specify the exact line number(s)
- Use format: **Line X**: [feedback]  
- For multi-line issues: **Lines X-Y**: [feedback]
- Reference line numbers from the diff output

## File Format for check-results.md
Your check-results.md file must follow this EXACT structure:

## Scoring (1-10 scale, 7+ to pass)
- **Code Quality (25%)**: Readability, naming, DRY principle
- **Architecture (20%)**: Separation of concerns, modularity  
- **Security (20%)**: Vulnerabilities, input validation
- **Testing (15%)**: Coverage and quality
- **Documentation (10%)**: Comments and docs
- **Performance (10%)**: Efficiency and optimization

## Response Format (MANDATORY)
```
## File Format for check-results.md
Your check-results.md file must follow this EXACT structure:

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

## 📁 Detailed Feedback by File

### src/filename.ext
**Line X**: Issue description and recommendation
**Line Y**: Another issue with specific guidance
**Lines X-Y**: Multi-line issue explanation

### another-file.ext
**Line Z**: Specific feedback with line reference
```

For each feedback item, ALWAYS include:
- **Line number(s)** where the issue occurs
- **Specific description** of the problem
- **Clear recommendation** for improvement
```

## Important Notes
- Create the complete analysis in `check-results.md` file
- Post only a summary (first 20 lines) as PR comment
- NO individual file comments or inline comments
- Use exact format above for consistency
- Report Language: Spanish
