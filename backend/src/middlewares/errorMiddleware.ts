import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: any;
}

export function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${req.method} ${req.url} - Status: ${statusCode}`, err);

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values((err as any).errors).map((e: any) => e.message)
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(400).json({
      success: false,
      message: `Duplicate field value entered: ${field}. Please use another value.`
    });
  }

  // Mongoose Cast Error (Invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Resource not found. Invalid ID format.'
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}
