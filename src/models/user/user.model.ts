import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database-sequelize.config';
import Joi from 'joi';
import { PASSWORD_REGEX } from '../../shared/constants/password-regex.constant';

export const RegisterUserValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().max(150),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(16).required(),
})

export interface UserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public password!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    }
  },
  {
    tableName: 'users',
    sequelize, // passing the `sequelize` instance is required
  }
);

export const UserEntity = User;
