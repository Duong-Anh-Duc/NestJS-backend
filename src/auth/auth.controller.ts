import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorater/customize';
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
  handleLogin(@Request() req){
    return this.authService.login(req.user)
  }
  @Get('profile')
  getProfile(@Request() req){
    return req.user
  }
  @Public()
  @Post('/register')
  register(@Body() createUserDto : CreateUserDto){
    return this.authService.register(createUserDto)
  }

  
  }
