// user/user.controller.ts
import { BadRequestException, Body, Controller, Get, Patch, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import JwtAuthenticationGuard from "../jwt-guard/jwt-guard.guard";
import { JwtService } from '@nestjs/jwt';

@Controller('user') // Changé de 'users' à 'user'
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService) {}

    @Patch('setNickname')
    @UseGuards(JwtAuthenticationGuard)
    async setNickname(@GetUser() user: any, @Body() body: { nickname: string }) { 
      try {
        const { nickname } = body;
        console.log("1. setNickname nickname: ", nickname);
        if (!nickname)
          throw new BadRequestException();
        const regex: RegExp = /^[a-zA-Z0-9\s\-\_]{2,20}$/;
        if (!regex.test(nickname))
          throw new BadRequestException();
        const userUpdate = await this.prisma.user.update({
          where: { id: user.id },
          data: { nickname: nickname },
        });
        return { message: 'Surnom enregistré avec succès' };
      } catch {
        throw new BadRequestException();
      }
    }

/*     @Get('setNickname')
    @UseGuards(JwtAuthenticationGuard)
    async setNickname(@GetUser() user: any, @Query('nickname') nickname: string) {
      try {
        nickname = "Nickname";
        console.log("1. setNickname nickname: ", nickname);
        if (!nickname) throw new BadRequestException('Nickname is required');
        const regex: RegExp = /^[a-zA-Z0-9\s\-\_]{2,10}$/;
        if (!regex.test(nickname)) throw new BadRequestException('Invalid nickname format');
        
        console.log("On est ici ! ");

        console.log(await this.prisma.user.update({
          where: { id: user.id },
          data: { nickname: nickname },
        }));

        const userUpdate = await this.prisma.user.update({
          where: { id: user.id },
          data: { nickname: nickname },
        });
        return { message: 'Surnom enregistré avec succès' };
      } catch (error) {
        throw new BadRequestException(error);
      }
    }*/
} 
