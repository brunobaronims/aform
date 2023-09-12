import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@/config/database.config';
import bcrypt from 'bcrypt';
import { getAuth } from 'firebase-admin/auth';

import { UnauthorizedException } from '@nestjs/common';

export class UserLoginQuery {
  readonly email: string;

  readonly password: string;

  constructor(params: UserLoginQuery) {
    this.email = params.email;
    this.password = params.password;
  }
}

@QueryHandler(UserLoginQuery)
export class UserLoginQueryHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: UserLoginQuery): Promise<string> {
    const { email, password } = query;

    const user = await this.prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } });
    if (!user)
      throw new UnauthorizedException('Password or email are incorrect');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Password or email are incorrect');

    const token = await getAuth().createCustomToken(user.id);

    return token;
  }
}
