import * as fs from 'fs';
import * as path from 'path';
import Mustache from 'mustache';
import { logger } from './logger';
import { ClaudeAnalysisResponse, TemplateData } from './types';

export class ReportService {
  private readonly configDir: string;
  private readonly outputDir: string;
  private readonly templatesDir: string;
  private readonly rubricsDir: string;

  constructor(configDir: string, outputDir: string) {
    this.configDir = configDir;
    this.outputDir = outputDir;
    this.templatesDir = path.join(configDir, 'templates');
    this.rubricsDir = path.join(configDir, 'rubrics');
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  loadRubric(rubricFile: string): string {
    const rubricPath = path.join(this.rubricsDir, rubricFile);
    if (!fs.existsSync(rubricPath)) {
      throw new Error(`Rubric file not found: ${rubricPath}`);
    }
    return fs.readFileSync(rubricPath, 'utf8');
  }

  generateReport(
    analysis: ClaudeAnalysisResponse,
    rubricFile: string,
    outputFileName?: string
  ): string {
    try {
      logger.debug('Processing analysis response and generating report...');
      
      // Calculate final score
      const finalScore = this.calculateFinalScore(analysis);
      const status = this.getStatusFromScore(finalScore);
      const statusIcon = this.getStatusIcon(status);
      
      // Calculate penalties and bonuses
      const totalPenalty = analysis.alert_signals.reduce((sum, signal) => sum + signal.penalty, 0);
      const totalBonus = analysis.bonuses.reduce((sum, bonus) => sum + bonus.value, 0);
      
      // Prepare template data
      const templateData: TemplateData = {
        FINAL_SCORE: finalScore,
        OVERALL_STATUS: status,
        OVERALL_STATUS_ICON: statusIcon,
        REVIEW_DATE: new Date().toLocaleString('es-ES'),
        CODE_QUALITY_SCORE: analysis.scores.code_quality,
        ARCHITECTURE_SCORE: analysis.scores.architecture,
        SECURITY_SCORE: analysis.scores.security,
        TESTING_SCORE: analysis.scores.testing,
        DOCUMENTATION_SCORE: analysis.scores.documentation,
        PERFORMANCE_SCORE: analysis.scores.performance,
        ALERT_DEDUCTIONS: totalPenalty,
        BONUS_POINTS: totalBonus,
        RUBRIC_USED: rubricFile,
        PROJECT_NAME: 'Pull Request Review',
        FILES_ANALYZED: analysis.file_analysis,
        CODE_QUALITY_ANALYSIS: analysis.analysis.code_quality.analysis,
        CODE_QUALITY_POSITIVES: analysis.analysis.code_quality.positives,
        CODE_QUALITY_IMPROVEMENTS: analysis.analysis.code_quality.improvements,
        ARCHITECTURE_ANALYSIS: analysis.analysis.architecture.analysis,
        ARCHITECTURE_POSITIVES: analysis.analysis.architecture.positives,
        ARCHITECTURE_IMPROVEMENTS: analysis.analysis.architecture.improvements,
        SECURITY_ANALYSIS: analysis.analysis.security.analysis,
        SECURITY_POSITIVES: analysis.analysis.security.positives,
        SECURITY_ISSUES: analysis.analysis.security.issues || [],
        TESTING_ANALYSIS: analysis.analysis.testing.analysis,
        TESTING_POSITIVES: analysis.analysis.testing.positives,
        TESTING_MISSING: analysis.analysis.testing.missing || [],
        DOCUMENTATION_ANALYSIS: analysis.analysis.documentation.analysis,
        DOCUMENTATION_POSITIVES: analysis.analysis.documentation.positives,
        DOCUMENTATION_MISSING: analysis.analysis.documentation.missing || [],
        PERFORMANCE_ANALYSIS: analysis.analysis.performance.analysis,
        PERFORMANCE_POSITIVES: analysis.analysis.performance.positives,
        PERFORMANCE_ISSUES: analysis.analysis.performance.issues || [],
        ALERT_SIGNALS: analysis.alert_signals,
        BONUS_ITEMS: analysis.bonuses,
        ACTION_REQUIRED: analysis.recommendations.action_required,
        DETAILED_RECOMMENDATIONS: analysis.recommendations.detailed_recommendations,
        NEXT_STEPS: analysis.recommendations.next_steps,
        ADDITIONAL_COMMENTS: analysis.additional_comments,
        TIMESTAMP: new Date().toISOString()
      };
      
      // Load and render template
      const templatePath = path.join(this.templatesDir, 'report-template.md');
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
      }
      
      const template = fs.readFileSync(templatePath, 'utf8');
      const report = Mustache.render(template, templateData);
      
      // Generate output filename if not provided
      const filename = outputFileName || this.generateOutputFileName();
      const outputPath = path.join(this.outputDir, filename);
      
      // Save report
      fs.writeFileSync(outputPath, report, 'utf8');
      
      logger.success(`Report saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      logger.error(`Failed to generate report: ${error}`);
      throw error;
    }
  }

  private calculateFinalScore(analysis: ClaudeAnalysisResponse): number {
    const weights = {
      code_quality: 0.25,
      architecture: 0.20,
      security: 0.20,
      testing: 0.15,
      documentation: 0.10,
      performance: 0.10
    };
    
    const weightedScore = 
      analysis.scores.code_quality * weights.code_quality +
      analysis.scores.architecture * weights.architecture +
      analysis.scores.security * weights.security +
      analysis.scores.testing * weights.testing +
      analysis.scores.documentation * weights.documentation +
      analysis.scores.performance * weights.performance;
    
    // Apply penalties and bonuses
    const totalPenalty = analysis.alert_signals.reduce((sum, signal) => sum + signal.penalty, 0);
    const totalBonus = analysis.bonuses.reduce((sum, bonus) => sum + bonus.value, 0);
    
    const finalScore = Math.max(0, Math.min(10, weightedScore - totalPenalty + totalBonus));
    return Math.round(finalScore * 10) / 10; // Round to 1 decimal place
  }

  private getStatusFromScore(score: number): string {
    if (score >= 8) return 'APROBADO';
    if (score >= 6) return 'REQUIERE CAMBIOS';
    return 'RECHAZADO';
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'APROBADO': return '✅';
      case 'REQUIERE CAMBIOS': return '⚠️';
      case 'RECHAZADO': return '❌';
      default: return '❓';
    }
  }

  private generateOutputFileName(): string {
    const timestamp = new Date().toISOString()
      .replace(/:/g, '')
      .replace(/\./g, '')
      .replace(/T/, '_')
      .substring(0, 15);
    return `pr_review_${timestamp}.md`;
  }
}
