import { INewUser} from "../../interfaces/userInterfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { returnUserSchemaNoPassword } from "../../schemas/userSchemas";


export const getUserService = async (
  userId: string
): Promise<INewUser> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
          id: parseInt(userId),
      });

      if (!findUser) {
        throw new AppError("User not found", 404);
      }

  return returnUserSchemaNoPassword.parse(findUser);
};
