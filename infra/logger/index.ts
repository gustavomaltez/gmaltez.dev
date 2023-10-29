import { DefaultLogger } from './strategies/default.ts';

// Contract --------------------------------------------------------------------

export abstract class BaseLogger {
  abstract info: (message: string, data?: unknown) => void;
  abstract warn: (message: string, data?: unknown) => void;
  abstract error: (message: string, data?: unknown) => void;
}

// Logger ----------------------------------------------------------------------

const logger = new DefaultLogger();

export { logger };
