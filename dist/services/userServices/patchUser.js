"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUserService = void 0;
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const errors_1 = require("../../errors");
const userSchemas_1 = require("../../schemas/userSchemas");
const patchUserService = (userData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const oldUserData = yield userRepository.findOneBy({
        id: parseInt(userId),
    });
    if (!oldUserData) {
        throw new errors_1.AppError("User not found", 404);
    }
    const newUser = userRepository.create(Object.assign(Object.assign({}, oldUserData), userData));
    yield userRepository.save(newUser);
    const patchedUser = userSchemas_1.returnUserSchemaNoPassword.parse(newUser);
    return patchedUser;
});
exports.patchUserService = patchUserService;
