import { contactSchema,returnContactSchema,updateContactSchema,allContactsSchemaResponse } from "../schemas/contactsSchema";
import { z } from "zod";
import { DeepPartial } from "typeorm";

export type IContact = z.infer<typeof contactSchema>;
export type INewContact = z.infer<typeof returnContactSchema>;
export type IPatchContact = DeepPartial<IContact>;
export type IAllContacts=z.infer<typeof allContactsSchemaResponse>
