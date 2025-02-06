import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/auth';
import { AuthService } from './auth.service';
// import { SignUpDto } from './dto/sign-up.dto';
// import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  // async signUp(@Body() signUpDto: SignUpDto, @Res() res) {
  //   const user = await this.authService.signUp(signUpDto);
  //   return res.status(201).json(user);
  // }

  // @Post('signin')
  // async signIn(@Body() signInDto: SignInDto, @Res() res) {
  //   const token = await this.authService.signIn(signInDto);
  //   return res.status(200).json({ token });
  // }

  // @Post('logout')
  // @UseGuards(AuthGuard())
  // async logout(@Req() req, @Res() res) {
  //   await this.authService.logout(req.user);
  //   return res.status(200).json({ message: 'Logged out successfully' });
  // }
}