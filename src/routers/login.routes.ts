import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { checkValidDataMiddleware } from "../middlewares/checkValidDataMiddleware";
import { loginSchema } from "../schemas/loginSchema";

export const loginRoutes: Router = Router();

loginRoutes.post("", checkValidDataMiddleware(loginSchema), loginController);
