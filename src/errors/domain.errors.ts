import type { PostgrestError } from '@supabase/supabase-js';

export class AppError extends Error {
  readonly code: string;
  readonly userMessage: string;
  readonly statusCode: number;
  readonly cause?: unknown;

  constructor(params: {
    code: string;
    message: string;
    userMessage: string;
    statusCode?: number;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = 'AppError';
    this.code = params.code;
    this.userMessage = params.userMessage;
    this.statusCode = params.statusCode ?? 500;
    this.cause = params.cause;
  }

  static fromSupabase(error: PostgrestError | Error | unknown): AppError {
    if (error instanceof AppError) return error;

    if (error && typeof error === 'object' && 'code' in error) {
      const err = error as PostgrestError;
      const code = err.code ?? 'DB_ERROR';
      const authFailure = code === 'PGRST301' || code === '42501';
      return new AppError({
        code,
        message: err.message ?? 'Database error',
        userMessage: authFailure
          ? 'You do not have permission to perform this action.'
          : 'Something went wrong. Please try again.',
        statusCode: authFailure ? 403 : 500,
        cause: error,
      });
    }

    const message = error instanceof Error ? error.message : String(error);
    return new AppError({
      code: 'UNKNOWN',
      message,
      userMessage: 'Something went wrong. Please try again.',
      cause: error,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super({
      code: 'NOT_FOUND',
      message: `${resource} not found`,
      userMessage: `We couldn't find this ${resource}.`,
      statusCode: 404,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super({
      code: 'UNAUTHORIZED',
      message,
      userMessage: 'Please sign in to continue.',
      statusCode: 401,
    });
  }
}
