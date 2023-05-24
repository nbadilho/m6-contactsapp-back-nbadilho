import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity"; 
import { AppError } from "../errors";

export const checkValidContactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
  if (req.body.email) {
    const findContactEmail = await contactRepository.findOne({
      where: {
        email: req.body.email,
      },
    });
  
    if (findContactEmail) {
      throw new AppError("Email already exists", 409);
    }
  }


  if (req.body.phone) {
   
  const findContactPhone = await contactRepository.findOne({
    where: {
      phone: req.body.phone,
    },
  });

  if (findContactPhone) {
    throw new AppError("Phone number already exists", 409);
  }
  }


  return next();
};