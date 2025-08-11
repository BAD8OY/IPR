// POST /users — создать пользователя
// GET /users/:id — получить пользователя по id
// PUT /users/:id — обновить пользователя
// DELETE /users/:id — удалить пользователя
// GET /users — получить список пользователей (с пагинацией)


import express from "express";
import controller from "../controllers/user.controller.js";

const userRouter = express.Router()


userRouter.post('/users', controller.newUser);
userRouter.get('/users/:id', controller.getUserById);
userRouter.put('/users/:id', controller.updateUserById);
userRouter.delete('/users/:id', controller.deleteUserById);
userRouter.get('/users', controller.getUserWithFilter);

export {userRouter};