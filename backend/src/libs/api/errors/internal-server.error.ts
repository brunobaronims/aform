import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorResponse } from './api-error.response';

export default class InternalServerError implements ApiErrorResponse {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Something went wrong!' })
  message: string;

  @ApiProperty({ example: 'Internal Server Error' })
  error: string;

  constructor(body: InternalServerError) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
  }
}