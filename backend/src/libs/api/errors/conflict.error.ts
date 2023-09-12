import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorResponse } from './api-error.response';

export default class ConflictError implements ApiErrorResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Email is already in use' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  constructor(body: ConflictError) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
  }
}