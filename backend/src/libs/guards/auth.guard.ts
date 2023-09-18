import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { isFirebaseError } from './error.guard';
import { UserRepositoryPort } from '@/modules/user/database/user.repository.port';
import { USER_REPOSITORY } from '@/modules/user/user.di-tokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepositoryPort
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const auth = getAuth();
    const request = context.switchToHttp().getRequest();
    const token = await request.headers.authorization.replace('Bearer ', '');

    try {
      const result = await auth.verifyIdToken(token);

      const user = await this.userRepo.user({ id: result.uid });
      if (!user) throw new UnauthorizedException();

      const userData = user.getAttributes();
      request.user = {
        handle: userData.handle,
        id: userData.id
      };

      return true;
    } catch (e: unknown) {
      if (isFirebaseError(e)) {
        if (e.code === 'auth/argument-error')
          throw new UnauthorizedException('Invalid token');

        if (e.code === 'auth/id-token-expired')
          throw new UnauthorizedException('Token is expired');
      }

      throw new UnauthorizedException();
    }
  }
}
