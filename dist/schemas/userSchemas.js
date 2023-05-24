"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.returnUserSchemaNoPassword = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(45),
    email: zod_1.z.string().email().max(45),
    phone: zod_1.z.string().min(8).max(13),
    password: zod_1.z.string().max(120),
});
exports.returnUserSchemaNoPassword = exports.userSchema
    .extend({
    id: zod_1.z.number(),
    createdAt: zod_1.z.string()
})
    .omit({
    password: true,
});
exports.updateUserSchema = exports.userSchema.partial();
