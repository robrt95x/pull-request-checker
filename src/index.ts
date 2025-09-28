#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import { GitService } from './git';
import { ClaudeService } from './claude';
import { ReportService } from './report';
import { Logger } from './logger';
import { ReviewConfig } from './types';

class PRReviewer {
  private readonly gitService: GitService;
  private readonly claudeService: ClaudeService;
  private readonly reportService: ReportService;
  private readonly logger: Logger;

  constructor(config: ReviewConfig) {
    this.logger = new Logger(config.debugMode, config.verbose);
    this.gitService = new GitService();
    this.claudeService = new ClaudeService(config.claudeApiKey);
    
    // Use config directory in the root of the project
    const configDir = path.join(process.cwd(), 'config');
    const outputDir = path.join(process.cwd(), 'output');
    this.reportService = new ReportService(configDir, outputDir);
  }

  async run(config: ReviewConfig): Promise<void> {
    try {
      this.logger.info('🚀 Iniciando revisión de Pull Request...');
      
      // Validate repository
      if (!(await this.gitService.validateRepository())) {
        process.exit(1);
      }

      // Get git diff
      this.logger.info('📁 Obteniendo cambios del repositorio...');
      const diffContent = await this.gitService.getDiff(config.targetBranch);
      
      if (!diffContent.trim()) {
        this.logger.warning('No se encontraron cambios para revisar');
        process.exit(0);
      }

      // Get modified files
      const modifiedFiles = await this.gitService.getModifiedFiles(config.targetBranch);
      
      this.logger.info('📋 Archivos modificados:');
      modifiedFiles.forEach(file => {
        if (file.trim()) {
          this.logger.info(`  - ${file}`);
        }
      });

      // Load rubric
      this.logger.info(`📖 Cargando rúbrica: ${config.rubricFile}`);
      const rubricContent = this.reportService.loadRubric(config.rubricFile);

      // Analyze with Claude
      this.logger.info('🤖 Preparando análisis con Claude AI...');
      this.logger.info('🧠 Analizando código con Claude AI...');
      
      const analysisResult = await this.claudeService.analyzeCode(
        diffContent,
        rubricContent,
        modifiedFiles
      );

      // Generate report
      this.logger.info('📄 Generando reporte de revisión...');
      const reportPath = this.reportService.generateReport(
        analysisResult,
        config.rubricFile,
        config.outputFile
      );

      this.logger.success('✨ Revisión completada exitosamente!');
      this.logger.info(`📊 Reporte guardado en: ${reportPath}`);
      
    } catch (error) {
      this.logger.error(`Error durante la revisión: ${error}`);
      process.exit(1);
    }
  }
}

async function main(): Promise<void> {
  const program = new Command();

  program
    .name('pr-reviewer')
    .description('🔍 PR Reviewer - Revisión Automática de Pull Requests')
    .version('1.0.0');

  program
    .option('-b, --branch <branch>', 'Branch objetivo para comparar', 'main')
    .option('-r, --rubric <rubric>', 'Archivo de rúbrica a usar', 'code-review-rubric.md')
    .option('-o, --output <output>', 'Nombre del archivo de salida')
    .option('-d, --debug', 'Activar modo debug', false)
    .option('-v, --verbose', 'Activar modo verbose', false)
    .action(async (options: any) => {
      // Validate required environment variables
      const claudeApiKey = process.env.CLAUDE_API_KEY;
      if (!claudeApiKey) {
        console.error('❌ Error: CLAUDE_API_KEY environment variable is required');
        console.error('Please set your Claude API key: export CLAUDE_API_KEY=your_api_key_here');
        process.exit(1);
      }

      const config: ReviewConfig = {
        claudeApiKey,
        claudeModel: 'claude-3-5-sonnet-20241022',
        targetBranch: options.branch,
        rubricFile: options.rubric,
        outputFile: options.output,
        debugMode: options.debug,
        verbose: options.verbose
      };

      const reviewer = new PRReviewer(config);
      await reviewer.run(config);
    });

  program.parse();
}

// Show usage information
if (process.argv.length === 2) {
  console.log(`
🔍 PR Reviewer - Revisión Automática de Pull Requests

VARIABLES DE ENTORNO REQUERIDAS:
  CLAUDE_API_KEY          Clave de API de Claude (REQUERIDO)

EJEMPLOS:
  # Revisión básica contra main
  npm run review

  # Revisión contra develop con rúbrica personalizada
  npm run review -- --branch develop --rubric frontend-rubric.md

  # Revisión con salida personalizada y modo debug
  npm run review -- --output my-review.md --debug

Para más opciones, usa: npm run review -- --help
`);
  process.exit(0);
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}
