import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorResponse } from './api-error.response';

export default class BadRequestError implements ApiErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Validation error' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({
    example: ['incorrect email'],
    description: 'Optional list of sub-errors',
    nullable: true,
    required: false
  })
  subErrors?: string[];

  constructor(body: BadRequestError) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
    this.subErrors = body.subErrors;
  }
}
