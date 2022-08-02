import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginBodyRequestDto } from './auth/dtos/login-body-request.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Default service. The distinctive Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Login service. If succeeds, provides a JWT' })
  @ApiBody({ type: LoginBodyRequestDto })
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

}
