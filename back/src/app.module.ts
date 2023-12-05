// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service'; // Assurez-vous d'importer votre service UserService
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TwofaService } from './twofa/twofa.service';
import { TwofaModule } from './twofa/twofa.module';



@Module({
  imports: [
    UserModule, PrismaModule, AuthModule, TwofaModule ,PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
/*     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }), */
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    PrismaService, AppService, AuthService, UserService, TwofaService ,ConfigService, JwtStrategy],
})
export class AppModule {}

