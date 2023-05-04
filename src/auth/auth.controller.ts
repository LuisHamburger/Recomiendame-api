import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserDTO) {
    return await this.authService.registerUser(user);
  }

  @Post('login')
  async validateUser(@Body() login: LoginDTO) {
    return await this.authService.validateUser(login);
  }

  @Post('isValidToken')
  async isValidToken(@Body('token') token: string) {
    return await this.authService.validateToken(token);
  }
}
