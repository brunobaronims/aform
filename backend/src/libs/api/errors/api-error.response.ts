import { ApiProperty } from '@nestjs/swagger';

export interface ApiErrorResponse {
  readonly statusCode: number;

  readonly message: string;

  readonly error: string;

  readonly subErrors?: string[];
}
