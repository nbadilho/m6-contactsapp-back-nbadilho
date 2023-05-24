import { Request, Response } from "express";
import { IUser,INewUser,IPatchUser } from "../interfaces/userInterfaces";
import { createUserService } from "../services/userServices/createUser";
import { getUserService } from "../services/userServices/getUser";
import { patchUserService } from "../services/userServices/patchUser";
import { deleteUserService } from "../services/userServices/deleteUser";


export const createNewUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser:INewUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const getUserController = async (req: Request, res: Response) => {
  const userId = res.locals.userId
  const user:INewUser = await getUserService(userId);

  return res.status(200).json(user);
};


export const patchUserController = async (req: Request, res: Response) => {
  const userData: IPatchUser = req.body;
  const userId = res.locals.userId

  const newUser = await patchUserService(userData, userId);

  return res.status(200).json(newUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
    const userId = res.locals.userId

  await deleteUserService(userId);

  return res.status(204).send();
};

