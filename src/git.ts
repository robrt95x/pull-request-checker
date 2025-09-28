import { simpleGit, SimpleGit } from 'simple-git';
import { logger } from './logger';

export class GitService {
  private readonly git: SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async validateRepository(): Promise<boolean> {
    try {
      const isRepo = await this.git.checkIsRepo();
      if (!isRepo) {
        logger.error('Not in a git repository');
        return false;
      }
      return true;
    } catch (error) {
      logger.error(`Git validation failed: ${error}`);
      return false;
    }
  }

  async getDiff(targetBranch: string, contextLines = 3): Promise<string> {
    try {
      logger.debug(`Getting git diff against branch: ${targetBranch}`);
      
      // Check if target branch exists locally or remotely
      let ref = targetBranch;
      try {
        await this.git.revparse([targetBranch]);
      } catch {
        try {
          await this.git.revparse([`origin/${targetBranch}`]);
          ref = `origin/${targetBranch}`;
        } catch {
          throw new Error(`Target branch '${targetBranch}' does not exist locally or on origin`);
        }
      }

      // Get the diff with context lines
      const diff = await this.git.diff([`-U${contextLines}`, `${ref}...HEAD`]);
      return diff;
    } catch (error) {
      logger.error(`Failed to get git diff: ${error}`);
      throw error;
    }
  }

  async getModifiedFiles(targetBranch: string): Promise<string[]> {
    try {
      logger.debug(`Getting modified files against branch: ${targetBranch}`);
      
      // Check if target branch exists locally or remotely
      let ref = targetBranch;
      try {
        await this.git.revparse([targetBranch]);
      } catch {
        try {
          await this.git.revparse([`origin/${targetBranch}`]);
          ref = `origin/${targetBranch}`;
        } catch {
          throw new Error(`Target branch '${targetBranch}' does not exist locally or on origin`);
        }
      }

      // Get modified files
      const result = await this.git.diff([`${ref}...HEAD`, '--name-only']);
      return result.split('\n').filter((file: string) => file.trim() !== '');
    } catch (error) {
      logger.error(`Failed to get modified files: ${error}`);
      throw error;
    }
  }

  async getCurrentBranch(): Promise<string> {
    try {
      const branch = await this.git.revparse(['--abbrev-ref', 'HEAD']);
      return branch.trim();
    } catch (error) {
      logger.error(`Failed to get current branch: ${error}`);
      throw error;
    }
  }

  async getCommitInfo(): Promise<{ hash: string; author: string; message: string }> {
    try {
      const log = await this.git.log(['HEAD', '-1']);
      const latest = log.latest;
      if (!latest) {
        throw new Error('No commits found');
      }
      
      return {
        hash: latest.hash,
        author: latest.author_name,
        message: latest.message
      };
    } catch (error) {
      logger.error(`Failed to get commit info: ${error}`);
      throw error;
    }
  }
}
