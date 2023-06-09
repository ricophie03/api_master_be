/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray } from 'class-validator';
import { UserModel } from '../models/users.entity';

export class FindAllUserResponse {
  @IsNumber()
  @ApiProperty()
  count: number;

  @IsArray()
  @ApiProperty()
  data: UserModel[];
}

export class CreateUserRequest {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class UpdateUserRequest {
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @ApiPropertyOptional()
  password?: string;
}

export class UserLoginRequest {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
