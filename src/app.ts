import "reflect-metadata"
import "express-async-errors"
import cors from "cors"
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routers/user.routes";
import { loginRoutes } from "./routers/login.routes";
import { contactsRoutes } from "./routers/contacts.routes";


const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/contacts",contactsRoutes)

app.use(handleErrors);

export default app
