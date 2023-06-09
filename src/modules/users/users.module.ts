/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/users.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
