/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserModel } from '../models/users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserRequest,
  FindAllUserResponse,
  UpdateUserRequest,
  UserLoginRequest,
} from './users.contract';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() body: UserLoginRequest): Promise<string> {
    const user = await this.userService.findOneByEmailAndPassword(body);
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
        },
        secretKey,
        { expiresIn: '1d' },
      );
      return token;
    } else {
      throw new UnauthorizedException('User Not Found or Invalid Password');
    }
  }

  @Post('/sign-in')
  async create(@Body() createUserDto: CreateUserRequest): Promise<UserModel> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get()
  async findAll(@Req() req: Request): Promise<FindAllUserResponse | any> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const user = jwt.verify(token, secretKey) as jwt.JwtPayload;
        const checkUser = await this.userService.findOne(user.id);
        if (checkUser) {
          return this.userService.findAll();
        } else {
          throw new UnauthorizedException('User Not Found!');
        }
      } else {
        throw new UnauthorizedException('Missing Token, Not Authorized!');
      }
    } catch (error) {
      console.log('error controller findAll users:', error);
      const err = {
        status: error.statusCode || 500,
        error: error,
      };
      return err;
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<UserModel> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = jwt.verify(token, secretKey) as jwt.JwtPayload;
      const checkUser = await this.userService.findOne(user.id);
      if (checkUser) {
        return this.userService.findOne(id);
      } else {
        throw new UnauthorizedException('User Not Found!');
      }
    } else {
      throw new UnauthorizedException('Missing Token, Not Authorized!');
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequest,
    @Req() req: Request,
  ): Promise<UserModel> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = jwt.verify(token, secretKey) as jwt.JwtPayload;
      const checkUser = await this.userService.findOne(user.id);
      if (checkUser) {
        return this.userService.update(id, updateUserDto);
      } else {
        throw new UnauthorizedException('User Not Found!');
      }
    } else {
      throw new UnauthorizedException('Missing Token, Not Authorized!');
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = jwt.verify(token, secretKey) as jwt.JwtPayload;
      const checkUser = await this.userService.findOne(user.id);
      if (checkUser) {
        return this.userService.remove(id);
      } else {
        throw new UnauthorizedException('User Not Found!');
      }
    } else {
      throw new UnauthorizedException('Missing Token, Not Authorized!');
    }
  }
}
