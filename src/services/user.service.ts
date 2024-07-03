import { WhereOptions } from 'sequelize';
import { UserEntity, UserAttributes, User } from '../models/user/user.model'

export class UserServices {

  // Create new user
  async createUser(data: any): Promise<User> {
    return await UserEntity.create(data);
  }


  /*
  //create a User
  

  //get all Users
  async getUsers() {
    try {
      const Users = await User.find({})
      return Users

    } catch (error) {
      console.log(error)
    }
  }
  */

  //get a single User
  async getUser(where: WhereOptions<UserAttributes>): Promise<User | null> {
    return await UserEntity.findOne({ where });
  }

}

//export the class
export const userService = new UserServices()