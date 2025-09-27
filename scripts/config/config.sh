#!/bin/bash

# =============================================================================
# CONFIGURACIÓN PRINCIPAL - PR REVIEWER
# =============================================================================

# Claude API Configuration
CLAUDE_API_KEY="${CLAUDE_API_KEY:-}"
CLAUDE_MODEL="claude-3-5-sonnet-20241022"
CLAUDE_API_URL="https://api.anthropic.com/v1/messages"

# Paths Configuration
if [[ -z "${SCRIPT_DIR:-}" ]]; then
    SCRIPT_DIR="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"
fi
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
RUBRICS_DIR="$SCRIPT_DIR/rubrics"
TEMPLATES_DIR="$SCRIPT_DIR/templates"
OUTPUT_DIR="$SCRIPT_DIR/output"
TEST_APP_DIR="$PROJECT_ROOT/test-application"

# Review Configuration
DEFAULT_RUBRIC="code-review-rubric.md"
OUTPUT_FORMAT="markdown"
SCORING_SCALE="1-10"
MIN_PASSING_SCORE="7"

# Git Configuration
DEFAULT_BRANCH="main"
DIFF_CONTEXT_LINES="3"

# Output Configuration
TIMESTAMP_FORMAT="%Y%m%d_%H%M%S"
REPORT_PREFIX="pr_review"

# Debug Configuration
DEBUG_MODE="${DEBUG_MODE:-false}"
VERBOSE="${VERBOSE:-false}"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions for colored output
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_debug() {
    if [[ "$DEBUG_MODE" == "true" ]]; then
        echo -e "${PURPLE}[DEBUG]${NC} $1"
    fi
}

# Validation functions
validate_config() {
    log_debug "Validating configuration..."
    
    if [[ -z "$CLAUDE_API_KEY" ]]; then
        log_error "CLAUDE_API_KEY is not set. Please set it as an environment variable."
        return 1
    fi
    
    if [[ ! -d "$RUBRICS_DIR" ]]; then
        log_error "Rubrics directory not found: $RUBRICS_DIR"
        return 1
    fi
    
    if [[ ! -d "$TEMPLATES_DIR" ]]; then
        log_error "Templates directory not found: $TEMPLATES_DIR"
        return 1
    fi
    
    if [[ ! -d "$OUTPUT_DIR" ]]; then
        log_warning "Output directory not found, creating: $OUTPUT_DIR"
        mkdir -p "$OUTPUT_DIR"
    fi
    
    log_success "Configuration validated successfully"
    return 0
}

# Export all variables for use in other scripts
export CLAUDE_API_KEY CLAUDE_MODEL CLAUDE_API_URL
export SCRIPT_DIR PROJECT_ROOT RUBRICS_DIR TEMPLATES_DIR OUTPUT_DIR TEST_APP_DIR
export DEFAULT_RUBRIC OUTPUT_FORMAT SCORING_SCALE MIN_PASSING_SCORE
export DEFAULT_BRANCH DIFF_CONTEXT_LINES
export TIMESTAMP_FORMAT REPORT_PREFIX
export DEBUG_MODE VERBOSE
export RED GREEN YELLOW BLUE PURPLE CYAN NC

# Source this file in other scripts with: source "$(dirname "$0")/config/config.sh"
