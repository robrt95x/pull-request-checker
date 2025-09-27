#!/bin/bash

# =============================================================================
# PR REVIEWER - Script Principal
# =============================================================================
# Este script analiza un Pull Request usando Claude AI y genera un reporte
# de revisión basado en rúbricas predefinidas.
# 
# Uso:
#   ./review.sh [opciones]
#
# Opciones:
#   -b, --branch BRANCH     Branch objetivo (default: main)
#   -r, --rubric RUBRIC     Archivo de rúbrica a usar
#   -o, --output OUTPUT     Archivo de salida personalizado
#   -d, --debug             Modo debug
#   -v, --verbose           Modo verbose
#   -h, --help              Mostrar ayuda
# =============================================================================

set -euo pipefail

# Source configuration and utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config/config.sh"
source "$SCRIPT_DIR/utils.sh"

# =============================================================================
# VARIABLES GLOBALES
# =============================================================================
TARGET_BRANCH="$DEFAULT_BRANCH"
RUBRIC_FILE="$DEFAULT_RUBRIC"
OUTPUT_FILE=""
SHOW_HELP=false

# =============================================================================
# FUNCIONES
# =============================================================================

show_usage() {
    cat << EOF
🔍 PR Reviewer - Revisión Automática de Pull Requests

USO:
    $0 [opciones]

OPCIONES:
    -b, --branch BRANCH     Branch objetivo para comparar (default: $DEFAULT_BRANCH)
    -r, --rubric RUBRIC     Archivo de rúbrica a usar (default: $DEFAULT_RUBRIC)
    -o, --output OUTPUT     Nombre del archivo de salida
    -d, --debug             Activar modo debug
    -v, --verbose           Activar modo verbose
    -h, --help              Mostrar esta ayuda

EJEMPLOS:
    # Revisión básica contra main
    $0

    # Revisión contra develop con rúbrica personalizada
    $0 --branch develop --rubric frontend-rubric.md

    # Revisión con salida personalizada
    $0 --output my-review.md --debug

VARIABLES DE ENTORNO:
    CLAUDE_API_KEY          Clave de API de Claude (REQUERIDO)
    DEBUG_MODE              true/false para modo debug
    VERBOSE                 true/false para modo verbose

ARCHIVOS:
    Rúbricas:              $RUBRICS_DIR/
    Templates:             $TEMPLATES_DIR/
    Reportes generados:    $OUTPUT_DIR/

Para más información, consulta la documentación del proyecto.
EOF
}

# Parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -b|--branch)
                TARGET_BRANCH="$2"
                shift 2
                ;;
            -r|--rubric)
                RUBRIC_FILE="$2"
                shift 2
                ;;
            -o|--output)
                OUTPUT_FILE="$2"
                shift 2
                ;;
            -d|--debug)
                DEBUG_MODE="true"
                shift
                ;;
            -v|--verbose)
                VERBOSE="true"
                shift
                ;;
            -h|--help)
                SHOW_HELP=true
                shift
                ;;
            *)
                log_error "Opción desconocida: $1"
                show_usage
                exit 1
                ;;
        esac
    done
}

# Call Claude API
call_claude_api() {
    local prompt="$1"
    local max_tokens="${2:-4000}"
    
    log_debug "Calling Claude API..."
    
    local payload=$(jq -n \
        --arg model "$CLAUDE_MODEL" \
        --arg prompt "$prompt" \
        --argjson max_tokens "$max_tokens" \
        '{
            model: $model,
            max_tokens: $max_tokens,
            messages: [
                {
                    role: "user",
                    content: $prompt
                }
            ]
        }')
    
    local response=$(curl -s \
        -H "Content-Type: application/json" \
        -H "x-api-key: $CLAUDE_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -d "$payload" \
        "$CLAUDE_API_URL")
    
    if [[ $? -ne 0 ]]; then
        log_error "Failed to call Claude API"
        return 1
    fi
    
    # Extract content from response
    echo "$response" | jq -r '.content[0].text // empty'
}

# Create analysis prompt
create_analysis_prompt() {
    local diff_content="$1"
    local rubric_content="$2"
    local modified_files="$3"
    
    cat << EOF
Eres un experto revisor de código con años de experiencia. Tu tarea es analizar un Pull Request y generar una revisión detallada basada en la rúbrica proporcionada.

## RÚBRICA A SEGUIR:
$rubric_content

## ARCHIVOS MODIFICADOS:
$modified_files

## DIFF DEL PULL REQUEST:
\`\`\`diff
$diff_content
\`\`\`

## INSTRUCCIONES:
1. Analiza el código siguiendo cada categoría de la rúbrica
2. Asigna puntuaciones (1-10) para cada categoría
3. Identifica señales de alerta y bonificaciones
4. Genera comentarios específicos y constructivos
5. Proporciona recomendaciones de mejora

## FORMATO DE RESPUESTA REQUERIDO:
Responde en formato JSON con la siguiente estructura:

\`\`\`json
{
    "scores": {
        "code_quality": 8,
        "architecture": 7,
        "security": 9,
        "testing": 6,
        "documentation": 7,
        "performance": 8
    },
    "analysis": {
        "code_quality": {
            "score": 8,
            "analysis": "Análisis detallado...",
            "positives": ["Aspecto positivo 1", "Aspecto positivo 2"],
            "improvements": ["Mejora sugerida 1", "Mejora sugerida 2"]
        },
        "architecture": {
            "score": 7,
            "analysis": "Análisis detallado...",
            "positives": ["Aspecto positivo 1"],
            "improvements": ["Mejora sugerida 1"]
        },
        "security": {
            "score": 9,
            "analysis": "Análisis detallado...",
            "positives": ["Aspecto positivo 1"],
            "improvements": [],
            "issues": [
                {
                    "severity": "MEDIUM",
                    "description": "Descripción del problema",
                    "location": "archivo.js:123",
                    "recommendation": "Recomendación específica"
                }
            ]
        },
        "testing": {
            "score": 6,
            "analysis": "Análisis detallado...",
            "positives": ["Tests presentes"],
            "missing": ["Falta test para caso X", "Falta test de integración"]
        },
        "documentation": {
            "score": 7,
            "analysis": "Análisis detallado...",
            "positives": ["Comentarios claros"],
            "missing": ["Falta documentación de API"]
        },
        "performance": {
            "score": 8,
            "analysis": "Análisis detallado...",
            "positives": ["Código optimizado"],
            "issues": [
                {
                    "issue": "Query ineficiente",
                    "impact": "MEDIUM",
                    "suggestion": "Usar índice en columna X"
                }
            ]
        }
    },
    "alert_signals": [
        {
            "type": "Hard-coded credentials",
            "description": "Credencial en texto plano encontrada",
            "location": "config.js:15",
            "penalty": 5,
            "recommendation": "Usar variables de entorno"
        }
    ],
    "bonuses": [
        {
            "type": "Refactoring improvement",
            "description": "Mejora significativa en la estructura",
            "value": 1
        }
    ],
    "file_analysis": [
        {
            "path": "src/components/Button.tsx",
            "type": "javascript",
            "lines_changed": 25,
            "score": 8,
            "comments": "Componente bien estructurado con buenas prácticas de React."
        }
    ],
    "recommendations": {
        "action_required": "REQUIERE CAMBIOS",
        "detailed_recommendations": "Recomendaciones específicas...",
        "next_steps": [
            "Corregir problema de seguridad en config.js",
            "Agregar tests faltantes",
            "Documentar nueva API"
        ]
    },
    "additional_comments": "Comentarios adicionales del revisor..."
}
\`\`\`

IMPORTANTE: 
- Responde ÚNICAMENTE con el JSON válido
- No incluyas texto adicional antes o después del JSON
- Asegúrate de que el JSON esté bien formateado
- Sé específico y constructivo en tus comentarios
- Basa tus puntuaciones en evidencia del código analizado
EOF
}

# Process Claude response and generate report
process_analysis_response() {
    local claude_response="$1"
    local output_file="$2"
    
    log_debug "Processing Claude response..."
    
    # Validate JSON response
    if ! echo "$claude_response" | jq . >/dev/null 2>&1; then
        log_error "Invalid JSON response from Claude"
        log_debug "Response: $claude_response"
        return 1
    fi
    
    # Extract data from JSON
    local code_quality_score=$(echo "$claude_response" | jq -r '.scores.code_quality')
    local architecture_score=$(echo "$claude_response" | jq -r '.scores.architecture')
    local security_score=$(echo "$claude_response" | jq -r '.scores.security')
    local testing_score=$(echo "$claude_response" | jq -r '.scores.testing')
    local documentation_score=$(echo "$claude_response" | jq -r '.scores.documentation')
    local performance_score=$(echo "$claude_response" | jq -r '.scores.performance')
    
    # Calculate weighted score
    local weighted_score=$(calculate_weighted_score \
        "$code_quality_score" "$architecture_score" "$security_score" \
        "$testing_score" "$documentation_score" "$performance_score")
    
    # Calculate penalties and bonuses
    local total_penalty=0
    local total_bonus=0
    
    if echo "$claude_response" | jq -e '.alert_signals[]' >/dev/null 2>&1; then
        total_penalty=$(echo "$claude_response" | jq '[.alert_signals[].penalty] | add')
    fi
    
    if echo "$claude_response" | jq -e '.bonuses[]' >/dev/null 2>&1; then
        total_bonus=$(echo "$claude_response" | jq '[.bonuses[].value] | add')
    fi
    
    # Apply modifiers
    local final_score=$(apply_score_modifiers "$weighted_score" "$total_penalty" "$total_bonus")
    local status=$(get_status_from_score "$final_score")
    local status_icon=$(get_status_icon "$status")
    
    # Load and process template
    local template_content=$(load_template "report-template.md")
    local report_date=$(get_report_date)
    
    # Generate final report using simple template replacement
    # This is a simplified version - in a full implementation,
    # you would process all the JSON data and populate all template variables
    local final_report=$(echo "$template_content" | \
        sed "s/{{FINAL_SCORE}}/$final_score/g" | \
        sed "s/{{OVERALL_STATUS}}/$status/g" | \
        sed "s/{{OVERALL_STATUS_ICON}}/$status_icon/g" | \
        sed "s/{{REVIEW_DATE}}/$report_date/g" | \
        sed "s/{{CODE_QUALITY_SCORE}}/$code_quality_score/g" | \
        sed "s/{{ARCHITECTURE_SCORE}}/$architecture_score/g" | \
        sed "s/{{SECURITY_SCORE}}/$security_score/g" | \
        sed "s/{{TESTING_SCORE}}/$testing_score/g" | \
        sed "s/{{DOCUMENTATION_SCORE}}/$documentation_score/g" | \
        sed "s/{{PERFORMANCE_SCORE}}/$performance_score/g" | \
        sed "s/{{ALERT_DEDUCTIONS}}/$total_penalty/g" | \
        sed "s/{{BONUS_POINTS}}/$total_bonus/g" | \
        sed "s/{{RUBRIC_USED}}/$RUBRIC_FILE/g")
    
    # Save report
    save_to_output "$final_report" "$output_file"
}

# Main review function
run_review() {
    log_info "🚀 Iniciando revisión de Pull Request..."
    
    # Validate configuration and dependencies
    if ! validate_config || ! validate_dependencies; then
        exit 1
    fi
    
    # Get git diff
    log_info "📁 Obteniendo cambios del repositorio..."
    local diff_content
    if ! diff_content=$(get_git_diff "$TARGET_BRANCH"); then
        log_error "Failed to get git diff"
        exit 1
    fi
    
    if [[ -z "$diff_content" ]]; then
        log_warning "No se encontraron cambios para revisar"
        exit 0
    fi
    
    # Get modified files
    local modified_files
    if ! modified_files=$(get_modified_files "$TARGET_BRANCH"); then
        log_error "Failed to get modified files"
        exit 1
    fi
    
    log_info "📋 Archivos modificados:"
    echo "$modified_files" | while read -r file; do
        [[ -n "$file" ]] && log_info "  - $file"
    done
    
    # Load rubric
    log_info "📖 Cargando rúbrica: $RUBRIC_FILE"
    local rubric_path="$RUBRICS_DIR/$RUBRIC_FILE"
    if [[ ! -f "$rubric_path" ]]; then
        log_error "Rubric file not found: $rubric_path"
        exit 1
    fi
    
    local rubric_content
    rubric_content=$(cat "$rubric_path")
    
    # Create analysis prompt
    log_info "🤖 Preparando análisis con Claude AI..."
    local analysis_prompt
    analysis_prompt=$(create_analysis_prompt "$diff_content" "$rubric_content" "$modified_files")
    
    # Call Claude API
    log_info "🧠 Analizando código con Claude AI..."
    local claude_response
    if ! claude_response=$(call_claude_api "$analysis_prompt"); then
        log_error "Failed to get analysis from Claude"
        exit 1
    fi
    
    if [[ -z "$claude_response" ]]; then
        log_error "Empty response from Claude API"
        exit 1
    fi
    
    # Generate output filename if not provided
    if [[ -z "$OUTPUT_FILE" ]]; then
        OUTPUT_FILE=$(generate_output_filename)
    fi
    
    # Process response and generate report
    log_info "📄 Generando reporte de revisión..."
    if ! process_analysis_response "$claude_response" "$OUTPUT_FILE"; then
        log_error "Failed to process analysis response"
        exit 1
    fi
    
    log_success "✨ Revisión completada exitosamente!"
    log_info "📊 Reporte guardado en: $OUTPUT_DIR/$OUTPUT_FILE"
}

# =============================================================================
# SCRIPT PRINCIPAL
# =============================================================================

main() {
    # Parse arguments
    parse_arguments "$@"
    
    # Show help if requested
    if [[ "$SHOW_HELP" == "true" ]]; then
        show_usage
        exit 0
    fi
    
    # Run the review
    run_review
}

# Execute main function with all arguments
main "$@"