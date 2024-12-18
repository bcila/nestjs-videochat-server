import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 400;
    let message = exception['detail'];

    switch (exception['code']) {
      case '23505':
        status = HttpStatus.CONFLICT;
        message = 'Unique constraint failed';
    }

    response.status(200).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
