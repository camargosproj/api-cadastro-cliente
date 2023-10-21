import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CustomHttpException } from '../../../application/erros/custom-erros';

@Catch(CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception?.code || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
