import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ){}
  
  @Get()
  @Redirect('' + process.env.URL_LOCAL_FRONT + '/') //auth
  Bienvenue(){
  }
  @Get('test')
  @Redirect(process.env.REDIRECT_URL_2) //auth/test
  getConnected(){
    console.log('test atteint');
    return(process.env.INTRA_42)
  }

  @Get('42')
  @Redirect(process.env.REDIRECT_URL)
  connect(){
    console.log('42 atteint');
    return(process.env.INTRA_42)
  }

  @Get('2fa')
  @Redirect(process.env.REDIRECT_URL_3)
  ft_transcendence(){
    console.log('2fa atteint');
    return(()=> process.env.INTRA_42)
  }
}
