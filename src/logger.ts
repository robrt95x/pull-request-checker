import chalk from 'chalk';

export class Logger {
  private readonly debugMode: boolean;
  private readonly verboseMode: boolean;

  constructor(debugMode = false, verbose = false) {
    this.debugMode = debugMode;
    this.verboseMode = verbose;
  }

  info(message: string): void {
    console.log(chalk.blue('[INFO]'), message);
  }

  success(message: string): void {
    console.log(chalk.green('[SUCCESS]'), message);
  }

  warning(message: string): void {
    console.log(chalk.yellow('[WARNING]'), message);
  }

  error(message: string): void {
    console.error(chalk.red('[ERROR]'), message);
  }

  debug(message: string): void {
    if (this.debugMode) {
      console.log(chalk.gray('[DEBUG]'), message);
    }
  }

  verbose(message: string): void {
    if (this.verboseMode) {
      console.log(chalk.cyan('[VERBOSE]'), message);
    }
  }
}

export const logger = new Logger();
