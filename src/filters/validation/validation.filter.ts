import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse()
    return response.status(422).json({
      statusCode: 422,
      createdFrom: "ValidationFilter",
      errors: exception.validationErrors
    })
  }
}
