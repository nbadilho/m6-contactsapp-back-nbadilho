import { z } from "zod";
import { returnUserSchemaNoPassword} from "./userSchemas";

export const contactSchema = z.object({
    name: z.string().min(2).max(45),
    email: z.string().email().max(45),
    phone: z.string().min(8).max(13),
  });

export const returnContactSchema = contactSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    user:returnUserSchemaNoPassword
  });

export const allReturnSchema=returnContactSchema.omit({user:true})
export const updateContactSchema = contactSchema.partial();

export const allContactsSchemaResponse = z.array(allReturnSchema)