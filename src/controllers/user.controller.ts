import User from "../models/mongo/user.model.js";
import {Json} from "sequelize/types/utils";


/**
 * POST /users — создать пользователя
 */
async function createUser(email: string, name: string, profile: string) {
    // const user = new User;
    // user.email = email;
    // user.name = name;
    // user.profile = profile;
    // user.createdAt = new Date(Date.now());
    await User.create({email: email, name: name, profile: JSON.parse(profile), createdAt: new Date(Date.now())})
}

/**
 * GET /users/:id — получить пользователя по id
 */
async function getUser(id) {
    return User.findById(id).then(data => data._doc);

}

/**
 * PUT /users/:id — обновить пользователя
 */
async function updateUser(userId, email?: string, name?: string, profile?: object) {

}

/**
 * DELETE /users/:id — удалить пользователя
 */
async function deleteUser(userId) {

}

/**
 * GET /users — получить список пользователей (с пагинацией)
 */
async function getUsers(userId, email?: string, name?: string, profile?: object) {

}

export {createUser, getUser, updateUser, deleteUser, getUsers}