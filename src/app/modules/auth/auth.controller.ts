import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


const createUser: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AuthServices.createUserIntoDb(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result
    });
})

const loginUser: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AuthServices.loginUser(req.body);
    const {token} = result;

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successfully",
        data: {
            token
        }
    });
})

export const AuthControllers = {
    createUser, 
    loginUser
}