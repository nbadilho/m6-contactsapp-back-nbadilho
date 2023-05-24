import { Request, Response } from "express";
import { ILoginUser } from "../interfaces/loginInterface";
import { loginTokenService } from "../services/loginServices/login";


export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: ILoginUser = req.body;

  const token = await loginTokenService(loginData);

  return res.json({
    token: token,
  });
};
