import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { returnContactSchema} from "../../schemas/contactsSchema";
import { IPatchContact,INewContact} from "../../interfaces/contactsInterface";


export const patchContactService = async (newContactData: IPatchContact, contactId: string,userId: string): Promise<INewContact> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const oldContactData: Contact | null = await contactRepository.findOneBy({ id:parseInt(contactId) })

    if (!oldContactData) {
        throw new AppError("Contact not found", 404)
    }
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        id: parseInt(userId),
    });

    if (!findUser) {
      throw new AppError("User not found", 404);
    }

    const newContact= contactRepository.create({
        ...oldContactData,
        ...newContactData,
        user:findUser
    })

    await contactRepository.save(newContact)


    return returnContactSchema.parse(newContact)

}

