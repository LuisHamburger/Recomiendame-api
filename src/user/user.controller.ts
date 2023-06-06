import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth-strategies/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { PatchUserDTO } from './dtos/patch-user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateUser(@Body() user: PatchUserDTO, @GetUser('id') userId: string) {
    return await this.userService.updateUser({ id: userId, ...user });
  }
}
