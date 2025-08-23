import express from "express";
import controller from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post('/api/auth/register', controller.register);
authRouter.post('/api/auth/login', controller.login);

export {authRouter};