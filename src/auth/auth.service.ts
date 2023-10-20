import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

interface IUser {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User or password are incorrect!');
    }
    const isPasswordMatched = await argon2.verify(user.password, password);
    if (user && isPasswordMatched) {
      return user;
    }
    throw new UnauthorizedException('User or password are incorrect!');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      user: {
        id,
        email,
      },
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async logout(user: IUser) {
    const { id, email } = user;
    return {
      user: {
        id,
        email,
      },
      access_token: '',
    };
  }
}
