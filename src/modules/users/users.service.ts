/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/users.entity';
import {
  CreateUserRequest,
  FindAllUserResponse,
  UpdateUserRequest,
  UserLoginRequest,
} from './users.contract';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userRepositories: typeof UserModel,
  ) {}

  async findAll(): Promise<FindAllUserResponse> {
    try {
      const users = await this.userRepositories.findAll();
      const count = await this.userRepositories.count();
      return {
        count: count,
        data: users,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<UserModel> {
    try {
      const user = await this.userRepositories.findByPk(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async findOneByEmailAndPassword(req: UserLoginRequest): Promise<UserModel> {
    try {
      const user = await this.userRepositories.findOne({
        where: { email: req.email },
      });

      if (!user) {
        return null; // User not found
      }

      const isPasswordValid = await bcrypt.compare(req.password, user.password);

      if (!isPasswordValid) {
        return null;
      }
      return user.get();
    } catch (error) {
      console.log('login users.service error ::: ', error);
      return error;
    }
  }

  async create(createUserDto: CreateUserRequest): Promise<UserModel> {
    try {
      // Generate a random salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const user = await this.userRepositories.create({
        ...createUserDto,
        password: hashedPassword,
        id: uuidv4(),
      });
      console.log('user : ', user);
      return user;
    } catch (error) {
      console.log('error create User : ', error);
      return error;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserRequest,
  ): Promise<UserModel> {
    try {
      const user = await this.userRepositories.findByPk(id);

      if (user) {
        // Generate a random salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(
          updateUserDto.password ? updateUserDto.password : '',
          salt,
        );

        await user.update(
          {
            ...user,
            name: updateUserDto.name ? updateUserDto.name : user.name,
            email: updateUserDto.email ? updateUserDto.email : user.email,
            password: updateUserDto.password ? hashedPassword : user.password,
          },
          { where: { id } },
        );
        return await this.findOne(id);
      }
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const deleteUser = await this.userRepositories.destroy({ where: { id } });
      const isSuccess = deleteUser ? true : false;
      return {
        success: isSuccess,
      };
    } catch (error) {
      console.log('error remove on users.service :::', error);
      return error;
    }
  }
}
