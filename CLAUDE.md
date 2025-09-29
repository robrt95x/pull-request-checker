# Claude PR Review Configuration

## Your Task
1. Run: `gh pr diff [PR_NUMBER]` and `gh pr view [PR_NUMBER]`
2. Review code using the rubric below (CRITICALLY distinguish between added, removed, and existing code)
3. Create file: `check-results.md` with complete analysis (MUST include line numbers)
4. Post PR comment with summary + artifact download link

## CRITICAL: Understanding Git Diff Format
When analyzing `gh pr diff` output, you MUST understand these symbols:
- **Lines starting with `+`**: NEW code being ADDED in this PR
- **Lines starting with `-`**: OLD code being REMOVED in this PR  
- **Lines with no prefix (or space)**: EXISTING code (context, unchanged)
- **Lines starting with `@@`**: Location markers (e.g., `@@ -10,5 +12,8 @@`)

### Review Focus Rules:
- **PRIMARY FOCUS**: Lines with `+` (newly added code) - these need the most scrutiny
- **SECONDARY FOCUS**: Lines with `-` (removed code) - check if removal is appropriate
- **MINIMAL FOCUS**: Context lines (no prefix) - only review if they relate to added/removed code
- **DO NOT review**: Unchanged existing code unless it directly impacts the changes

## CRITICAL: Line Number Requirements
- For EVERY feedback item, specify the exact line number(s) FROM THE NEW FILE VERSION
- Use format: **Line X** (added): [feedback] - for new code with `+`
- Use format: **Line X** (removed): [feedback] - for removed code with `-`  
- Use format: **Lines X-Y** (added): [feedback] - for multi-line new code
- Reference the actual line numbers that will exist in the file AFTER the PR is merged
- When referencing diff context, use the `@@` markers to identify correct line positions

### Line Number Calculation:
- In `@@ -old_start,old_count +new_start,new_count @@`:
  - `-old_start`: line number in original file
  - `+new_start`: line number in new file (USE THIS for your feedback)
- Count lines from the `+new_start` position for accurate line references

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
**Line X** (added): Issue description for newly added code with `+` prefix
**Line Y** (removed): Feedback on code removal with `-` prefix
**Lines X-Y** (added): Multi-line issue for code block added in this PR
**Line Z** (context): Only if existing code directly impacts the changes

### another-file.ext  
**Line A** (added): Specific feedback for new functionality
**Line B** (modified): Feedback when line was changed (had both `-` and `+`)

## 🔍 Example Diff Analysis

Given this diff:
```
@@ -15,4 +18,6 @@ function processData(data) {
   if (!data) {
-    return null;
+    throw new Error("Data is required");
+    return false;
   }
+  console.log("Processing:", data);
   return data.processed;
```

Your feedback should reference:
- **Line 19** (added): Added error throwing - good defensive programming
- **Line 20** (added): Unreachable return statement after throw
- **Line 16** (removed): Removed null return - verify this doesn't break calling code  
- **Line 23** (added): Added console.log - remove before production
```

For each feedback item, ALWAYS include:
- **Line number(s)** where the issue occurs IN THE NEW FILE VERSION
- **Diff context** - specify if the issue is in added (+), removed (-), or modified code
- **Specific description** of the problem
- **Clear recommendation** for improvement

## 📝 What to Review by Priority

### HIGH PRIORITY (Must Review):
1. **New code** (lines with `+`): Focus your main analysis here
   - Code quality, security, performance issues in NEW code
   - Naming conventions, best practices for ADDED code
   - Architecture concerns in NEW implementations

2. **Removed code** (lines with `-`): Quick validation
   - Check if removals are appropriate and safe
   - Ensure no breaking changes or lost functionality

### MEDIUM PRIORITY (Review if relevant):
3. **Modified lines** (had both `-` and `+`): Changes to existing code
   - Improvements or regressions in modified code
   - Breaking changes in function signatures

### LOW PRIORITY (Usually skip):
4. **Context lines** (no prefix): Only if they directly impact the changes
   - Don't review unchanged existing code unless it affects new code
   - Skip analyzing stable, existing implementations
```

## Important Notes
- Create the complete analysis in `check-results.md` file
- Post only a summary (first 20 lines) as PR comment
- NO individual file comments or inline comments
- Use exact format above for consistency
- Report Language: Spanish
