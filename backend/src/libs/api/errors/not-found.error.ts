import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorResponse } from './api-error.response';

export default class UserNotFoundError implements ApiErrorResponse {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Incorrect email or password' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({
    example: ['incorrect email'],
    description: 'Optional list of sub-errors',
    nullable: true,
    required: false
  })
  subErrors?: string[];

  constructor(body: UserNotFoundError) {
    this.statusCode = body.statusCode;
    this.message = body.message;
    this.error = body.error;
    this.subErrors = body.subErrors;
  }
}