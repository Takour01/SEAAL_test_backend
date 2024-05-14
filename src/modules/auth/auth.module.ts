import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '3d' },
  }),],

})
export class AuthModule { }
