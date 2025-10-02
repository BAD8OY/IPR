import express from "express";
import controller from "../controllers/user.controller.js";
import {authorizationMiddleware} from "../middlewares/auth.middleware.js";
import {validObjectId, validUserCreate, validUserUpdate} from "../middlewares/valid.middleware.js";

const userRouter = express.Router();

userRouter.post('/users', authorizationMiddleware, validUserCreate, controller.newUser);
userRouter.get('/users/:id', authorizationMiddleware, validObjectId, controller.getUserById);
userRouter.put('/users/:id', authorizationMiddleware, validObjectId, validUserUpdate, controller.updateUserById);
userRouter.delete('/users/:id', authorizationMiddleware, validObjectId, controller.deleteUserById);
userRouter.get('/users', authorizationMiddleware, controller.getUserWithFilter);

export {userRouter};