import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ExceptionInterceptor } from './libs/interceptors/exception.interceptor';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor
  }
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    CqrsModule,
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [...interceptors]
})

export class AppModule {}