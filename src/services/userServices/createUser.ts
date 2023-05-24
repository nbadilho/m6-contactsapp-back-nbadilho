import { INewUser, IUser } from "../../interfaces/userInterfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { returnUserSchemaNoPassword } from "../../schemas/userSchemas";
import { hash } from "bcryptjs";

export const createUserService = async (userData: IUser): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const protectedPassword = await hash(userData.password, 10)

  const newUser = userRepository.create({
        name:userData.name,
        phone:userData.phone,
        email:userData.email,
        password: protectedPassword,
    })

    await userRepository.save(newUser)
    
    return returnUserSchemaNoPassword.parse(newUser)

;
};


