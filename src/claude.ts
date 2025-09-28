import Anthropic from '@anthropic-ai/sdk';
import { logger } from './logger';
import { ClaudeAnalysisResponse } from './types';

export class ClaudeService {
  private readonly client: Anthropic;
  private readonly model: string;

  constructor(apiKey: string, model = 'claude-3-5-sonnet-20241022') {
    this.client = new Anthropic({
      apiKey: apiKey,
    });
    this.model = model;
  }

  async analyzeCode(
    diffContent: string,
    rubricContent: string,
    modifiedFiles: string[],
    maxTokens = 4000
  ): Promise<ClaudeAnalysisResponse> {
    try {
      logger.debug('Calling Claude API...');
      
      const prompt = this.createAnalysisPrompt(diffContent, rubricContent, modifiedFiles);
      
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      if (response.content[0].type !== 'text') {
        throw new Error('Unexpected response format from Claude');
      }

      const responseText = response.content[0].text;
      logger.debug(`Claude response: ${responseText.substring(0, 200)}...`);

      // Parse JSON response
      let analysisResult: ClaudeAnalysisResponse;
      try {
        analysisResult = JSON.parse(responseText);
      } catch (parseError) {
        logger.error('Failed to parse Claude response as JSON');
        logger.debug(`Raw response: ${responseText}`);
        throw new Error('Invalid JSON response from Claude');
      }

      return analysisResult;
    } catch (error) {
      logger.error(`Claude API call failed: ${error}`);
      throw error;
    }
  }

  private createAnalysisPrompt(
    diffContent: string,
    rubricContent: string,
    modifiedFiles: string[]
  ): string {
    const filesStr = modifiedFiles.join('\n- ');
    
    return `Eres un experto revisor de código con años de experiencia. Tu tarea es analizar un Pull Request y generar una revisión detallada basada en la rúbrica proporcionada.

## RÚBRICA A SEGUIR:
${rubricContent}

## ARCHIVOS MODIFICADOS:
- ${filesStr}

## DIFF DEL PULL REQUEST:
\`\`\`diff
${diffContent}
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
- Basa tus puntuaciones en evidencia del código analizado`;
  }
}
