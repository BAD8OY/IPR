// POST /users — создать пользователя
// GET /users/:id — получить пользователя по id
// PUT /users/:id — обновить пользователя
// DELETE /users/:id — удалить пользователя
// GET /users — получить список пользователей (с пагинацией)


import express from "express";
import service from "../services/user.service.js";

const userRouter = express.Router()


userRouter.post('/users', service.newUser);
userRouter.get('/users/:id', service.getUserById);
userRouter.put('/users/:id', service.updateUserById);
userRouter.delete('/users/:id', service.deleteUserById);
userRouter.get('/users', service.getUserWithFilter);

export {userRouter};