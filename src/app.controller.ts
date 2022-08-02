import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

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
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

}
