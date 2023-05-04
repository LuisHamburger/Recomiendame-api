import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { LoginDTO, UserDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

export interface AuthResponseToken {
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateToken(user: User): string {
    const payload = {
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(loginDTO: LoginDTO): Promise<AuthResponseToken> {
    const user: User = await this.userService.findOneByEmail(
      loginDTO.email.toUpperCase(),
    );

    if (!user) throw new NotFoundException();

    const isValidPassword: boolean = bcrypt.compareSync(
      loginDTO.password,
      user.password,
    );

    if (!isValidPassword)
      throw new BadRequestException('Email or password incorrect');

    return {
      token: this.generateToken(user),
    };
  }

  async registerUser(userDTO: UserDTO): Promise<AuthResponseToken> {
    const userExist = await this.userService.findOneByEmail(
      userDTO.email.toUpperCase(),
    );

    if (userExist) throw new ConflictException('Email is already registered');

    const salt = bcrypt.genSaltSync(10);

    const password = bcrypt.hashSync(userDTO.password, salt);

    const email = userDTO.email.toUpperCase();

    const level = userDTO.level;

    const fullName = userDTO.fullName;

    const user = await this.userService.createUser({
      email,
      password,
      fullName,
      level,
    });

    return {
      token: this.generateToken(user),
    };
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
