import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import logger from '../../common/logger';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<NewUserDto> {
    const user = new User();

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    try {
      const savedUser = await this.userRepository.save(user);
      return {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      };
    } catch (err) {
      logger.error('[UsersService][create]:', err);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find().catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    } catch (err) {
      logger.error('[UsersService][findAll]:', err);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id }).catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
      if (!user) {
        throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      logger.error('[UsersService][findOne]:', err);
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.delete(id).catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
      return;
    } catch (err) {
      logger.error('[UsersService][remove]:', err);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      logger.error('[UsersService][findByEmail]:', err);
    }
  }
}
