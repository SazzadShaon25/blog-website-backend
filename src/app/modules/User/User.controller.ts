import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const blockUser: RequestHandler = catchAsync(async(req, res, next)=>{
    const userId = req.params.userId;
    console.log(req.params);
    await UserServices.blockUser(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User blocked successfully",
    });
});

const deleteBlog: RequestHandler = catchAsync(async(req, res, next)=>{
    const id = req.params.id;
    const result = await UserServices.deleteBlogFromDb( id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog deleted successfully",
    });
});

export const UserControllers = {
    blockUser,
    deleteBlog
}