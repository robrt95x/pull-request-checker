export interface ReviewConfig {
  claudeApiKey: string;
  claudeModel: string;
  targetBranch: string;
  rubricFile: string;
  outputFile?: string;
  debugMode: boolean;
  verbose: boolean;
}

export interface ScoreCategory {
  score: number;
  analysis: string;
  positives: string[];
  improvements: string[];
  issues?: SecurityIssue[] | PerformanceIssue[];
  missing?: string[];
}

export interface SecurityIssue {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  location: string;
  recommendation: string;
}

export interface PerformanceIssue {
  issue: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  suggestion: string;
}

export interface AlertSignal {
  type: string;
  description: string;
  location: string;
  penalty: number;
  recommendation: string;
}

export interface Bonus {
  type: string;
  description: string;
  value: number;
}

export interface FileAnalysis {
  path: string;
  type: string;
  lines_changed: number;
  score: number;
  comments: string;
}

export interface ReviewRecommendations {
  action_required: 'APROBADO' | 'REQUIERE CAMBIOS' | 'RECHAZADO';
  detailed_recommendations: string;
  next_steps: string[];
}

export interface ClaudeAnalysisResponse {
  scores: {
    code_quality: number;
    architecture: number;
    security: number;
    testing: number;
    documentation: number;
    performance: number;
  };
  analysis: {
    code_quality: ScoreCategory;
    architecture: ScoreCategory;
    security: ScoreCategory & { issues?: SecurityIssue[] };
    testing: ScoreCategory;
    documentation: ScoreCategory;
    performance: ScoreCategory & { issues?: PerformanceIssue[] };
  };
  alert_signals: AlertSignal[];
  bonuses: Bonus[];
  file_analysis: FileAnalysis[];
  recommendations: ReviewRecommendations;
  additional_comments: string;
}

export interface TemplateData {
  FINAL_SCORE: number;
  OVERALL_STATUS: string;
  OVERALL_STATUS_ICON: string;
  REVIEW_DATE: string;
  CODE_QUALITY_SCORE: number;
  ARCHITECTURE_SCORE: number;
  SECURITY_SCORE: number;
  TESTING_SCORE: number;
  DOCUMENTATION_SCORE: number;
  PERFORMANCE_SCORE: number;
  ALERT_DEDUCTIONS: number;
  BONUS_POINTS: number;
  RUBRIC_USED: string;
  PROJECT_NAME: string;
  PR_NUMBER?: string;
  PR_TITLE?: string;
  PR_AUTHOR?: string;
  FILES_ANALYZED: FileAnalysis[];
  CODE_QUALITY_ANALYSIS: string;
  CODE_QUALITY_POSITIVES: string[];
  CODE_QUALITY_IMPROVEMENTS: string[];
  ARCHITECTURE_ANALYSIS: string;
  ARCHITECTURE_POSITIVES: string[];
  ARCHITECTURE_IMPROVEMENTS: string[];
  SECURITY_ANALYSIS: string;
  SECURITY_POSITIVES: string[];
  SECURITY_ISSUES: SecurityIssue[];
  TESTING_ANALYSIS: string;
  TESTING_POSITIVES: string[];
  TESTING_MISSING: string[];
  TEST_COVERAGE?: string;
  DOCUMENTATION_ANALYSIS: string;
  DOCUMENTATION_POSITIVES: string[];
  DOCUMENTATION_MISSING: string[];
  PERFORMANCE_ANALYSIS: string;
  PERFORMANCE_POSITIVES: string[];
  PERFORMANCE_ISSUES: PerformanceIssue[];
  ALERT_SIGNALS: AlertSignal[];
  BONUS_ITEMS: Bonus[];
  ACTION_REQUIRED: string;
  DETAILED_RECOMMENDATIONS: string;
  NEXT_STEPS: string[];
  ADDITIONAL_COMMENTS: string;
  TIMESTAMP: string;
}
