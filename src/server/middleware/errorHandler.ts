/**
 * Flawless Institution™ - Centralized Error Handler & Request Validator
 * Implements RFC-7807 Problem Details for HTTP APIs
 */
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    status: number;
    details?: any;
    timestamp: string;
  };
}

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Request Body Validation Middleware Generator
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message,
        }));
        return next(new AppError('Request validation failed', 400, 'VALIDATION_ERROR', issues));
      }
      next(err);
    }
  };
};

// Global Centralized Error Handling Middleware
export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: any = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    details = err.details;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = err.issues;
  } else if (err.name === 'SyntaxError') {
    statusCode = 400;
    code = 'INVALID_JSON';
    message = 'Malformed JSON payload in request body';
  } else {
    console.error('[ErrorHandler Caught Server Error]:', err);
    details = err.message;
  }

  const payload: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      status: statusCode,
      details,
      timestamp: new Date().toISOString(),
    },
  };

  res.status(statusCode).json(payload);
};
