import { WhereOptions } from 'sequelize';
import { UserEntity, UserAttributes, User } from '../models/user/user.model'

export class UserServices {

  // Create new user
  async createUser(data: any): Promise<User> {
    return await UserEntity.create(data);
  }

  //get a single User
  async getUser(where: WhereOptions<UserAttributes>): Promise<User | null> {
    return await UserEntity.findOne({ where });
  }

}

//export the class
export const userService = new UserServices()