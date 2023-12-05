import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User} from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: any, nickname: string): Promise<User> {
    try {
        const user = await this.prisma.user.create({
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          nickname: nickname,
          state: 'ONLINE',
          twoFactorSecret: authenticator.generateSecret(),
          //pfp_url: userData.pfp,
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { 
          email },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async turnOnTwoFactorAuthentication(userId: number): Promise<User> {
    try {
      return this.prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async getUserById(userId: number): Promise<any | null> {
    if (!userId) {
      throw new BadRequestException('User ID is missing');
    }
  
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(userId.toString()) },
      });
      return user;
    } catch (error) {
      console.error("User error 1: ", error);
      throw new BadRequestException();
    }
  }
  
}