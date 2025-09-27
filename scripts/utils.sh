#!/bin/bash

# =============================================================================
# UTILIDADES PARA PR REVIEWER
# =============================================================================

# Source configuration
SCRIPT_DIR="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"
source "$SCRIPT_DIR/config/config.sh"

# =============================================================================
# GIT UTILITIES
# =============================================================================

# Get git diff for the current changes
get_git_diff() {
    local target_branch="${1:-$DEFAULT_BRANCH}"
    local context_lines="${2:-$DIFF_CONTEXT_LINES}"
    
    log_debug "Getting git diff against branch: $target_branch"
    
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        return 1
    fi
    
    # Check if target branch exists (try local first, then origin/)
    if git rev-parse --verify "$target_branch" > /dev/null 2>&1; then
        local ref="$target_branch"
    elif git rev-parse --verify "origin/$target_branch" > /dev/null 2>&1; then
        local ref="origin/$target_branch"
    else
        log_error "Target branch '$target_branch' does not exist locally or on origin"
        return 1
    fi
    
    # Get the diff with context lines
    git diff -U"$context_lines" "$ref"...HEAD
}

# Get list of modified files
get_modified_files() {
    local target_branch="${1:-$DEFAULT_BRANCH}"
    
    log_debug "Getting modified files against branch: $target_branch"
    
    # Check if target branch exists (try local first, then origin/)
    if git rev-parse --verify "$target_branch" > /dev/null 2>&1; then
        local ref="$target_branch"
    elif git rev-parse --verify "origin/$target_branch" > /dev/null 2>&1; then
        local ref="origin/$target_branch"
    else
        log_error "Target branch '$target_branch' does not exist locally or on origin"
        return 1
    fi
    
    git diff --name-only "$ref"...HEAD
}

# Get commit messages for the PR
get_commit_messages() {
    local target_branch="${1:-$DEFAULT_BRANCH}"
    
    log_debug "Getting commit messages against branch: $target_branch"
    
    # Check if target branch exists (try local first, then origin/)
    if git rev-parse --verify "$target_branch" > /dev/null 2>&1; then
        local ref="$target_branch"
    elif git rev-parse --verify "origin/$target_branch" > /dev/null 2>&1; then
        local ref="origin/$target_branch"
    else
        log_error "Target branch '$target_branch' does not exist locally or on origin"
        return 1
    fi
    
    git log --oneline "$ref"...HEAD
}

# =============================================================================
# FILE UTILITIES
# =============================================================================

# Detect file type based on extension
detect_file_type() {
    local file_path="$1"
    local extension="${file_path##*.}"
    
    case "$extension" in
        "js"|"jsx"|"ts"|"tsx"|"mjs") echo "javascript" ;;
        "py") echo "python" ;;
        "java") echo "java" ;;
        "cpp"|"cc"|"cxx") echo "cpp" ;;
        "c") echo "c" ;;
        "cs") echo "csharp" ;;
        "php") echo "php" ;;
        "rb") echo "ruby" ;;
        "go") echo "go" ;;
        "rs") echo "rust" ;;
        "sql") echo "sql" ;;
        "json") echo "json" ;;
        "yaml"|"yml") echo "yaml" ;;
        "xml") echo "xml" ;;
        "html"|"htm") echo "html" ;;
        "css"|"scss"|"sass") echo "css" ;;
        "md") echo "markdown" ;;
        "txt") echo "text" ;;
        "sh"|"bash") echo "bash" ;;
        "Dockerfile") echo "docker" ;;
        *) echo "unknown" ;;
    esac
}

# Count lines in a file
count_file_lines() {
    local file_path="$1"
    
    if [[ -f "$file_path" ]]; then
        wc -l < "$file_path"
    else
        echo "0"
    fi
}

# Get file size in bytes
get_file_size() {
    local file_path="$1"
    
    if [[ -f "$file_path" ]]; then
        stat -f%z "$file_path" 2>/dev/null || stat -c%s "$file_path" 2>/dev/null || echo "0"
    else
        echo "0"
    fi
}

# =============================================================================
# TEMPLATE UTILITIES
# =============================================================================

# Simple template replacement function
replace_template_variables() {
    local template_content="$1"
    local -A variables=()
    
    # Read key-value pairs from stdin or arguments
    if [[ $# -gt 1 ]]; then
        shift
        while [[ $# -gt 0 ]]; do
            local key="$1"
            local value="$2"
            variables["$key"]="$value"
            shift 2
        done
    fi
    
    # Replace variables in template
    local result="$template_content"
    for key in "${!variables[@]}"; do
        result="${result//\{\{$key\}\}/${variables[$key]}}"
    done
    
    echo "$result"
}

# Load template from file
load_template() {
    local template_file="$1"
    local template_path="$TEMPLATES_DIR/$template_file"
    
    if [[ ! -f "$template_path" ]]; then
        log_error "Template file not found: $template_path"
        return 1
    fi
    
    cat "$template_path"
}

# =============================================================================
# SCORING UTILITIES
# =============================================================================

# Calculate weighted score
calculate_weighted_score() {
    local code_quality="$1"
    local architecture="$2"
    local security="$3"
    local testing="$4"
    local documentation="$5"
    local performance="$6"
    
    # Weights from rubric
    local cq_weight=0.25
    local arch_weight=0.20
    local sec_weight=0.20
    local test_weight=0.15
    local doc_weight=0.10
    local perf_weight=0.10
    
    # Calculate weighted score
    local weighted_score=$(awk "BEGIN {
        score = ($code_quality * $cq_weight) + 
                ($architecture * $arch_weight) + 
                ($security * $sec_weight) + 
                ($testing * $test_weight) + 
                ($documentation * $doc_weight) + 
                ($performance * $perf_weight)
        printf \"%.1f\", score
    }")
    
    echo "$weighted_score"
}

# Apply score modifiers (alerts and bonuses)
apply_score_modifiers() {
    local base_score="$1"
    local alert_penalty="$2"
    local bonus_points="$3"
    
    # Ensure bonus doesn't exceed maximum of 5 points
    local capped_bonus=$(awk "BEGIN {
        bonus = $bonus_points
        if (bonus > 5) bonus = 5
        print bonus
    }")
    
    # Calculate final score (minimum 1, maximum 10)
    local final_score=$(awk "BEGIN {
        score = $base_score - $alert_penalty + $capped_bonus
        if (score < 1) score = 1
        if (score > 10) score = 10
        printf \"%.1f\", score
    }")
    
    echo "$final_score"
}

# Get status based on score
get_status_from_score() {
    local score="$1"
    local min_passing="${2:-$MIN_PASSING_SCORE}"
    
    if (( $(awk "BEGIN {print ($score >= 9)}") )); then
        echo "EXCELENTE"
    elif (( $(awk "BEGIN {print ($score >= $min_passing)}") )); then
        echo "APROBADO"
    elif (( $(awk "BEGIN {print ($score >= 5)}") )); then
        echo "REQUIERE CAMBIOS"
    else
        echo "RECHAZADO"
    fi
}

# Get status icon
get_status_icon() {
    local status="$1"
    
    case "$status" in
        "EXCELENTE") echo "🌟" ;;
        "APROBADO") echo "✅" ;;
        "REQUIERE CAMBIOS") echo "⚠️" ;;
        "RECHAZADO") echo "❌" ;;
        *) echo "❓" ;;
    esac
}

# =============================================================================
# TIME UTILITIES
# =============================================================================

# Get current timestamp
get_timestamp() {
    local format="${1:-$TIMESTAMP_FORMAT}"
    date +"$format"
}

# Get formatted date for reports
get_report_date() {
    date '+%Y-%m-%d %H:%M:%S'
}

# =============================================================================
# OUTPUT UTILITIES
# =============================================================================

# Generate output filename
generate_output_filename() {
    local prefix="${1:-$REPORT_PREFIX}"
    local timestamp="$(get_timestamp)"
    local extension="${2:-md}"
    
    echo "${prefix}_${timestamp}.${extension}"
}

# Save content to output file
save_to_output() {
    local content="$1"
    local filename="$2"
    local output_path="$OUTPUT_DIR/$filename"
    
    echo "$content" > "$output_path"
    log_success "Report saved to: $output_path"
    echo "$output_path"
}

# =============================================================================
# VALIDATION UTILITIES
# =============================================================================

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate required tools
validate_dependencies() {
    local required_tools=("git" "curl" "jq" "awk")
    local missing_tools=()
    
    for tool in "${required_tools[@]}"; do
        if ! command_exists "$tool"; then
            missing_tools+=("$tool")
        fi
    done
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        log_error "Please install these tools before running the script"
        return 1
    fi
    
    log_success "All required dependencies are available"
    return 0
}

# =============================================================================
# EXPORT FUNCTIONS
# =============================================================================

# Make functions available to other scripts
export -f get_git_diff get_modified_files get_commit_messages
export -f detect_file_type count_file_lines get_file_size
export -f replace_template_variables load_template
export -f calculate_weighted_score apply_score_modifiers
export -f get_status_from_score get_status_icon
export -f get_timestamp get_report_date
export -f generate_output_filename save_to_output
export -f command_exists validate_dependencies
