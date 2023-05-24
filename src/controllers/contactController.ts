import { Request, Response } from "express";
import { createContactService } from "../services/contactServices/createContact";
import { getAllContactsService } from "../services/contactServices/getContacts";
import { deleteUserService } from "../services/userServices/deleteUser";
import { IContact,INewContact,IAllContacts,IPatchContact} from "../interfaces/contactsInterface";
import { patchContactService } from "../services/contactServices/patchContact";
import { deleteContactService } from "../services/contactServices/deleteContacts";


export const createNewContactController = async (req: Request, res: Response) => {
  const contactData: IContact = req.body;
  const userId = res.locals.userId

  const newContact:INewContact = await createContactService(contactData,userId);

  return res.status(201).json(newContact);
};

export const getAllContactsController = async (req: Request, res: Response) => {
  const userId = res.locals.userId
  const allContacts:IAllContacts = await getAllContactsService(userId);

  return res.status(200).json(allContacts);
};


export const patchContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id
  const userId = res.locals.userId
  const newContactData: IPatchContact = req.body

  const newContact = await patchContactService(newContactData, contactId,userId);

  return res.status(200).json(newContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
    const contactId = req.params.id

  await deleteContactService(contactId);

  return res.status(204).send();
};

