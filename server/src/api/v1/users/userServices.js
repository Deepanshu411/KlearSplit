import bcrypt from 'bcryptjs'
import { generatePassword } from '../utils/passwordGenerator.js';
import { createUserDb, getUserByIdDb, updateUserDb, deleteUserDb, getUserByEmailDb, getUserByPhoneDb } from './userDb.js';
import { validateUpdatedUser, validateUser } from './userValidations.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';
import AuthService from '../auth/authServices.js';
import { ErrorHandler } from '../middlewares/ErrorHandler.js';

class UserService {
    static createUserService = async (userData, next) => {
        const { error, value: user } = validateUser(userData, { stripUnknown: true })
        if (error) throw next(new ErrorHandler(400, error.message))

        const isEmailExists = await getUserByEmailDb(user.email)
        if (isEmailExists) throw next(new ErrorHandler(400, 'Email already exists!'));

        const isPhoneExists = await getUserByPhoneDb(user.phone)
        if (isPhoneExists) throw next(new ErrorHandler(400, 'Phone Number already exists!'))

        const password = generatePassword()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword

        console.log(password) // Send mail for password to the user

        const createdUser = await createUserDb(user)

        const accessToken = generateAccessToken(createdUser.user_id)

        const refreshToken = generateRefreshToken(createdUser.user_id)

        await AuthService.createRefreshTokenService({
            token: refreshToken,
            user_id: createdUser.user_id
        })

        return { user: createdUser, accessToken, refreshToken }
    }

    static getUserService = async (id, next) => {
        const user = await getUserByIdDb(id)
        if (!user) throw next(new ErrorHandler(404, 'User not found'))
        return user
    }

    static updateUserService = async (req, next) => {
        const userData = req.body
        const id = req.params.id
        await this.getUserService(id)

        const { error, updateUserData } = validateUpdatedUser(userData, { stripUnknown: true })

        if (error) throw next(new ErrorHandler(400, error.message))

        return await updateUserDb(updateUserData, id)
    }

    static deleteUserService = async (req) => {
        const id = req.params.id
        await this.getUserService(id)

        return await deleteUserDb(id)
    }
}

export default UserService