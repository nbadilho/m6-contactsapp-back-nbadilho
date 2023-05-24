import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ILoginUser } from "../../interfaces/loginInterface";
import jwt from "jsonwebtoken"
import "dotenv/config"



export const loginTokenService = async (loginData: ILoginUser): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

const comparedPassword = await compare(loginData.password, user.password);

if (!comparedPassword) {
     throw new AppError("Invalid credentials", 401);
  }

  const newToken: string = jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );
    return newToken

}



