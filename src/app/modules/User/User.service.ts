import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { Blog } from "../blog/blog.model";

const blockUser = async(userId: string)=>{
    console.log("blocking user id", userId);
    const user = await User.findByIdAndUpdate({_id: userId}, {isBlocked: true});
    if(!user){
        throw new AppError(404, "User not exists");
    }
};

const deleteBlogFromDb = async( blogId: string)=>{
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new AppError(404, "Blog not found");
    }
    
    const result = await Blog.deleteOne(
        {_id: blogId},
        {new: true}
    );

    return result;
}
export const UserServices = {
    blockUser,
    deleteBlogFromDb
}