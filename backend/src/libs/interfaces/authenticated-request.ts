import { Request } from '@nestjs/common';

interface UserObject {
  handle: string;
  id: string;
}

export interface AuthenticatedRequest extends Request {
  user: UserObject;
}