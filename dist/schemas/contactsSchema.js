"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allContactsSchemaResponse = exports.updateContactSchema = exports.allReturnSchema = exports.returnContactSchema = exports.contactSchema = void 0;
const zod_1 = require("zod");
const userSchemas_1 = require("./userSchemas");
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(45),
    email: zod_1.z.string().email().max(45),
    phone: zod_1.z.string().min(8).max(13),
});
exports.returnContactSchema = exports.contactSchema
    .extend({
    id: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    user: userSchemas_1.returnUserSchemaNoPassword
});
exports.allReturnSchema = exports.returnContactSchema.omit({ user: true });
exports.updateContactSchema = exports.contactSchema.partial();
exports.allContactsSchemaResponse = zod_1.z.array(exports.allReturnSchema);
