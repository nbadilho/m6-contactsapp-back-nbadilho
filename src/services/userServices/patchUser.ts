
import { INewUser, IPatchUser } from "../../interfaces/userInterfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { returnUserSchemaNoPassword } from "../../schemas/userSchemas";


export const patchUserService = async (
  userData: IPatchUser,
  userId: string
): Promise<INewUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: parseInt(userId),
  });

  if (!oldUserData) {
    throw new AppError("User not found", 404);
  }
  const newUser = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(newUser);

  const patchedUser = returnUserSchemaNoPassword.parse(newUser);

  return patchedUser;
};
