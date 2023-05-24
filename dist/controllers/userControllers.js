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
exports.deleteUserController = exports.patchUserController = exports.getUserController = exports.createNewUserController = void 0;
const createUser_1 = require("../services/userServices/createUser");
const getUser_1 = require("../services/userServices/getUser");
const patchUser_1 = require("../services/userServices/patchUser");
const deleteUser_1 = require("../services/userServices/deleteUser");
const createNewUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const newUser = yield (0, createUser_1.createUserService)(userData);
    return res.status(201).json(newUser);
});
exports.createNewUserController = createNewUserController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const user = yield (0, getUser_1.getUserService)(userId);
    return res.status(200).json(user);
});
exports.getUserController = getUserController;
const patchUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userId = res.locals.userId;
    const newUser = yield (0, patchUser_1.patchUserService)(userData, userId);
    return res.status(200).json(newUser);
});
exports.patchUserController = patchUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    yield (0, deleteUser_1.deleteUserService)(userId);
    return res.status(204).send();
});
exports.deleteUserController = deleteUserController;
