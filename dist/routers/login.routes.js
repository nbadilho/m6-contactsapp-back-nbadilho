"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const checkValidDataMiddleware_1 = require("../middlewares/checkValidDataMiddleware");
const loginSchema_1 = require("../schemas/loginSchema");
exports.loginRoutes = (0, express_1.Router)();
exports.loginRoutes.post("", (0, checkValidDataMiddleware_1.checkValidDataMiddleware)(loginSchema_1.loginSchema), loginController_1.loginController);
