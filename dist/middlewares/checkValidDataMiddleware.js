"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidDataMiddleware = void 0;
const checkValidDataMiddleware = (schema) => (req, res, next) => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    return next();
};
exports.checkValidDataMiddleware = checkValidDataMiddleware;
