import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export function handleApiError(error: unknown) {
  console.error('[API Error]:', error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.issues,
      },
      { status: 400 }
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  // Handle Prisma errors roughly
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    return NextResponse.json({ error: 'Data already exists or unique constraint failed' }, { status: 409 });
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
