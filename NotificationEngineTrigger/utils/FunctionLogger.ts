import { Context } from '@azure/functions';
import { LoggerService } from '@nestjs/common';

export class FunctionLogger implements LoggerService {
  private readonly functionContext: Context;

  constructor(context: Context) {
    this.functionContext = context;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: string) {
    this.functionContext.log(message);
  }
  /**
   * Write an 'error' level log.
   */
  error(message: string) {
    this.functionContext.log.error(message);
  }
  /**
   * Write a 'warn' level log.
   */
  warn(message: string) {
    this.functionContext.log.warn(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string) {
    this.functionContext.log.verbose(message);
  }
}
