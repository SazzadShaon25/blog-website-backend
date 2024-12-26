import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';

const createUserIntoDb = async(payload: TUser)=>{
    const result = await User.create(payload);
    const { _id, name, email } = result.toObject();
    return { _id, name, email };
}

const loginUser = async (payload: TLoginUser) => {
    const user = await User.findOne({ email: payload?.email }).select('+password');
    if (!user) {
        throw new AppError(401, "Invalid credentials");
    }

    // if (user.isBlocked) {
    //     throw new AppError(401, "User is blocked");
    // }

    // Properly await bcrypt.compare
    const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);
    if (!isPasswordMatched) {
        throw new AppError(401, "Invalid credentials");
    }

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const secret = '0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d';

    const token = jwt.sign(jwtPayload, secret, {
        expiresIn: '10d',
    });

    return {
        token,
    };
};


export const AuthServices = {
    createUserIntoDb,
    loginUser
}