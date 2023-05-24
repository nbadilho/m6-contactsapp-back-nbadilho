import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { returnContactSchema } from "../../schemas/contactsSchema";
import { IContact,INewContact} from "../../interfaces/contactsInterface";

export const createContactService = async (contactData:IContact, userId: string): Promise<INewContact> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        id: parseInt(userId),
    });

    if (!findUser) {
      throw new AppError("User not found", 404);
    }

    const newContact: Contact = contactRepository.create({
        ...contactData,
        user:findUser
    })

    await contactRepository.save(newContact)

    return returnContactSchema.parse(newContact)
}

