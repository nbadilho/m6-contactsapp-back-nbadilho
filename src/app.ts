import "reflect-metadata"
import "express-async-errors"
import cors from "cors"
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routers/createUser.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use(handleErrors);

export default app
