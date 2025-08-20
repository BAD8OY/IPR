import User, {IUser} from "../models/mongo/user.model.js";

/**
 * POST /users — создать пользователя
 */
async function createUser(email: string, name: string, profile: string) {
    const user: IUser = await User.create({
        email: email,
        name: name,
        profile: JSON.parse(profile),
        createdAt: new Date(Date.now())
    });
    console.log(user._doc._id.toString());
}

/**
 * GET /users/:id — получить пользователя по id
 */
async function getUser(userId: string): Promise<IUser> {
    return User.findById(userId).then(data => data?._doc);

}

/**
 * PUT /users/:id — обновить пользователя
 */
async function updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    const updatedUser: IUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        {new: true}
    );
    if (!updatedUser) {
        return null;
    }
    return updatedUser;
}

/**
 * DELETE /users/:id — удалить пользователя
 */
async function deleteUser(userId: string): Promise<IUser> {
    const result: IUser = await User.findByIdAndDelete(userId);
    if (!result) {
        return null;
    }
    return result;
}

/**
 * GET /users — получить список пользователей (с пагинацией)
 */
async function getUsers(): Promise<IUser[]> {
    return User.find();
}

export {createUser, getUser, updateUser, deleteUser, getUsers}