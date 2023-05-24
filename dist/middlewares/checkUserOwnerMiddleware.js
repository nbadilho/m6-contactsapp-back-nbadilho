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
exports.checkUserOwnerMiddleware = void 0;
const data_source_1 = require("../data-source");
const contact_entity_1 = require("../entities/contact.entity");
const errors_1 = require("../errors");
const checkUserOwnerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
    const contactId = req.params.id;
    const userId = res.locals.userId;
    const contact = yield contactRepository.findOne({
        where: {
            id: parseInt(contactId)
        },
        relations: {
            user: true
        }
    });
    if (!contact) {
        throw new errors_1.AppError("Contact not found", 404);
    }
    if (contact.user.id !== parseInt(userId)) {
        throw new errors_1.AppError("You don't have permission", 403);
    }
    return next();
});
exports.checkUserOwnerMiddleware = checkUserOwnerMiddleware;
