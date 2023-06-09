/* eslint-disable prettier/prettier */
import { Model, Column, Table, PrimaryKey, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
  })
export class UserModel extends Model {
  @PrimaryKey
  @Column
  id: string;
  
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @UpdatedAt
  updatedAt: Date;

  @CreatedAt
  createdAt: Date;
}
