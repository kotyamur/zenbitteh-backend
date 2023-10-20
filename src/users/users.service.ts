import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) {
      throw new BadRequestException('This email already exist!');
    }
    const user = await this.usersRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });

    const access_token = this.jwtService.sign({ email: createUserDto.email });
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      access_token,
    };
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
