import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { allContactsSchemaResponse } from "../../schemas/contactsSchema";
import { IAllContacts} from "../../interfaces/contactsInterface";

export const getAllContactsService = async (userId: string): Promise<IAllContacts> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        id: parseInt(userId),
    });

    if (!findUser) {
      throw new AppError("User not found", 404);
    }


    const contacts: Contact[] = await contactRepository.find({
        where: {
            user: findUser
        }
    })

    return allContactsSchemaResponse.parse(contacts)

}

