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
exports.deleteContactController = exports.patchContactController = exports.getAllContactsController = exports.createNewContactController = void 0;
const createContact_1 = require("../services/contactServices/createContact");
const getContacts_1 = require("../services/contactServices/getContacts");
const patchContact_1 = require("../services/contactServices/patchContact");
const deleteContacts_1 = require("../services/contactServices/deleteContacts");
const createNewContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const userId = res.locals.userId;
    const newContact = yield (0, createContact_1.createContactService)(contactData, userId);
    return res.status(201).json(newContact);
});
exports.createNewContactController = createNewContactController;
const getAllContactsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const allContacts = yield (0, getContacts_1.getAllContactsService)(userId);
    return res.status(200).json(allContacts);
});
exports.getAllContactsController = getAllContactsController;
const patchContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = req.params.id;
    const userId = res.locals.userId;
    const newContactData = req.body;
    const newContact = yield (0, patchContact_1.patchContactService)(newContactData, contactId, userId);
    return res.status(200).json(newContact);
});
exports.patchContactController = patchContactController;
const deleteContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = req.params.id;
    yield (0, deleteContacts_1.deleteContactService)(contactId);
    return res.status(204).send();
});
exports.deleteContactController = deleteContactController;
