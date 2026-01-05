import { Injectable, LoggerService } from '@nestjs/common';

/**
 * Application Logger Service
 * 
 * Centralized logging service used across all pattern implementations
 * This demonstrates the Singleton pattern in practice - NestJS ensures
 * only one instance exists throughout the application lifecycle
 */
@Injectable()
export class AppLogger implements LoggerService {
  private context = 'Application';

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    const logContext = context || this.context;
    console.log(`[${new Date().toISOString()}] [LOG] [${logContext}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    const logContext = context || this.context;
    console.error(`[${new Date().toISOString()}] [ERROR] [${logContext}] ${message}`);
    if (trace) {
      console.error(`Stack trace: ${trace}`);
    }
  }

  warn(message: string, context?: string) {
    const logContext = context || this.context;
    console.warn(`[${new Date().toISOString()}] [WARN] [${logContext}] ${message}`);
  }

  debug(message: string, context?: string) {
    const logContext = context || this.context;
    console.debug(`[${new Date().toISOString()}] [DEBUG] [${logContext}] ${message}`);
  }

  verbose(message: string, context?: string) {
    const logContext = context || this.context;
    console.log(`[${new Date().toISOString()}] [VERBOSE] [${logContext}] ${message}`);
  }
}
