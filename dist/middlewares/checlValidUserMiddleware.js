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
exports.checkValidUserMiddleware = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const errors_1 = require("../errors");
const checkValidUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const findUserEmail = yield userRepository.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (findUserEmail) {
        throw new errors_1.AppError("Email already exists", 409);
    }
    const findUserPhone = yield userRepository.findOne({
        where: {
            phone: req.body.phone,
        },
    });
    if (findUserPhone) {
        throw new errors_1.AppError("Phone number already exists", 409);
    }
    return next();
});
exports.checkValidUserMiddleware = checkValidUserMiddleware;
