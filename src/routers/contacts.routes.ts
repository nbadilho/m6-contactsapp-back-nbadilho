import { Router } from "express";
import { checkTokenMiddleware } from "../middlewares/checkTokenMiddleware";
import { checkValidDataMiddleware } from "../middlewares/checkValidDataMiddleware";
import { contactSchema,updateContactSchema } from "../schemas/contactsSchema";
import { createNewContactController,getAllContactsController,patchContactController,deleteContactController } from "../controllers/contactController";
import { checkUserOwnerMiddleware } from "../middlewares/checkUserOwnerMiddleware";


export const contactsRoutes = Router()


contactsRoutes.use(checkTokenMiddleware)

contactsRoutes.post("", checkValidDataMiddleware(contactSchema),createNewContactController)
contactsRoutes.get("", getAllContactsController)
contactsRoutes.patch("/:id", checkUserOwnerMiddleware, checkValidDataMiddleware(updateContactSchema), patchContactController)
contactsRoutes.delete("/:id",checkUserOwnerMiddleware, deleteContactController)

