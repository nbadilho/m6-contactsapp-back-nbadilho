import { Router } from "express";
import { checkValidDataMiddleware } from "../middlewares/checkValidDataMiddleware";
import { checkValidUserMiddleware } from "../middlewares/checlValidUserMiddleware";
import { updateUserSchema, userSchema } from "../schemas/userSchemas";
import { createNewUserController,getUserController,patchUserController,deleteUserController } from "../controllers/userControllers";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkPatchEmailMiddleware } from "../middlewares/checkPatchEmailMiddleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkValidDataMiddleware(userSchema),
  checkValidUserMiddleware,
  createNewUserController
);

userRoutes.use(checkTokenMiddleware)


userRoutes.get(
  "",
  getUserController
);

userRoutes.patch(
  "",
  checkValidDataMiddleware(updateUserSchema),
  checkPatchEmailMiddleware,
  patchUserController
);

userRoutes.delete(
  "",
  deleteUserController
);


