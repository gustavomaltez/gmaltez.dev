import { BaseLogger } from '../index.ts';

export class DefaultLogger implements BaseLogger {
  public info(message: string, data?: unknown) {
    console.log('[INFO]', message, data);
  }

  public warn(message: string, data?: unknown) {
    console.log('[WARN]', message, data);
  }

  public error(message: string, data?: unknown) {
    console.log('[ERROR]', message, data);
  }
}
