import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorResponse } from './api-error.response';

export default class UnauthorizedError implements ApiErrorResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Password or email are incorrect' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  constructor(body: UnauthorizedError) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
  }
}
