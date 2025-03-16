import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

import { Request, Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from './decorater/customize';
import { LocalAuthGuard } from './local-auth.guard';
@Controller("auth")
export class AuthController {
  constructor(
    private authService : AuthService
  ) {
   
  }
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage("Login success")
  handleLogin(@Req() req, @Res({passthrough : true}) response : Response){
    return this.authService.login(req.user, response)
  }
  @Public()
  @Post('/register')
  @ResponseMessage('Register a new user')
  register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto)
  }
  @Get('/account')
  @ResponseMessage('Get user information')
  account(@Req() req){  
    return req.user
  }
  @Public()
  @Get('/refresh')
  @ResponseMessage("Get user by refresh token")
  handleRefreshToken(@Req() request : Request, @Res({passthrough : true}) response : Response){
    const refreshToken = request.cookies['refresh_token']
    return this.authService.processNewToken(refreshToken, response)
  }
  @Post('/logout')
  @ResponseMessage('Logout User')
  handleLogOut(@User() user : IUser, @Res({passthrough : true}) response : Response){
    return this.authService.logout(user, response)
  }
  }
