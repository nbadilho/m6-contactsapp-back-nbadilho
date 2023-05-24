
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors";


export const deleteUserService = async (userId: string): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
          id: parseInt(userId),
      });

      if (!findUser) {
        throw new AppError("User not found", 404);
      }

    await userRepository.remove(findUser)
}

