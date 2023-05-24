import { z } from "zod";


export const userSchema = z.object({
    name: z.string().min(2).max(45),
    email: z.string().email().max(45),
    phone: z.string().min(8).max(13),
    password: z.string().max(120),
  });

export const returnUserSchemaNoPassword = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string()
  })
  .omit({
    password: true,
  });

export const updateUserSchema = userSchema.partial();

