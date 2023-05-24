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
exports.checkValidContactMiddleware = void 0;
const data_source_1 = require("../data-source");
const contact_entity_1 = require("../entities/contact.entity");
const errors_1 = require("../errors");
const checkValidContactMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
    if (req.body.email) {
        const findContactEmail = yield contactRepository.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (findContactEmail) {
            throw new errors_1.AppError("Email already exists", 409);
        }
    }
    if (req.body.phone) {
        const findContactPhone = yield contactRepository.findOne({
            where: {
                phone: req.body.phone,
            },
        });
        if (findContactPhone) {
            throw new errors_1.AppError("Phone number already exists", 409);
        }
    }
    return next();
});
exports.checkValidContactMiddleware = checkValidContactMiddleware;
