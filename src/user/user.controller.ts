import { Controller, Patch, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth-strategies/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateUser(@Request() req) {
    console.log(req.user);
    //await this.userService.updateUser(user);
  }
}
