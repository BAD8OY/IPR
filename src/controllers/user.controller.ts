import User from "../models/mongo/user.model";

let users;
users = await User.find({});
console.log('Найдены пользователи:', users);

/**
 * POST /users — создать пользователя
 */
async function createUser(userId, email: string, name: string, profile: object) {
    const user = new User;
    user.email = email;
    user.name = name;
    user.profile = profile;
    user.createdAt = Date.now();
}

/**
 * GET /users/:id — получить пользователя по id
 */
async function getUser(id) {

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