import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contact.entity"; 
import { AppError } from "../errors";
import { Repository } from "typeorm";

export const checkUserOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
    const contactId: string = req.params.id
    const userId: string = res.locals.userId

    const contact = await contactRepository.findOne({
        where: {
            id:parseInt(contactId)
        },
        relations: {
            user: true
        }
    })

    if (!contact) {
        throw new AppError("Contact not found", 404);
    }

    if (contact.user.id !== parseInt(userId)) {
        throw new AppError("You don't have permission", 403);
    }

    return next()
}

