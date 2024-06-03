import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthRegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthLoginDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Req() req: Request, @Res() res: Response) {
    return this.authService.signout(req, res);
  }
}
