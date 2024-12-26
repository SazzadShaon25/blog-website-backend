import { JwtPayload } from "jsonwebtoken";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";


const getBlogsFromDb = async (query: Record<string, unknown>) => {
    const blogSearchableFields = ['title', 'content'];

    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(blogSearchableFields)
        .filter()  
        .sort();   

    const result = await blogQuery.modelQuery.populate("author");

    const blogData = result.map((blog) => {
        const { _id, title, content, author } = blog;
        return {
            _id,
            title,
            content,
            author, 
        };
    });

    return blogData;
};

const createBlogIntoDb = async(payload: TBlog, userData: JwtPayload)=>{
    const user  = await User.findOne({email: userData.email}).select("+password");
    if(!user){
        throw new AppError(400, "User not exists");
    }
    if(user.isBlocked){
        throw new AppError(400, "User is blocked");
    }

    const newBlog = {
        title: payload.title,
        content: payload.content,
        author: user._id 
    }
    const result = await Blog.create(newBlog);
    await result.populate("author");

    const {_id, title, content, author} = result;
    return {_id, title, content, author}
}

const updateBlogIntoDb = async(payload: TBlog, userData: JwtPayload, blogId: string)=>{
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new AppError(404, "Blog not found");
    }
    console.log(blog.author);

    const user  = await User.findOne({_id: blog.author}).select("+password");
    if(!user){
        throw new AppError(400, "User not exists");
    }

    if(user.email !== userData.email)
    {
        throw new AppError(401, "You are not authorized");
    }

    if(user.isBlocked){
        throw new AppError(400, "User is blocked");
    }

    const result = await Blog.findOneAndUpdate(
        {_id: blogId},
        payload,
        {new: true}
    ).populate("author");

    return result;
};

const deleteBlogFromDb = async( userData: JwtPayload, blogId: string)=>{
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new AppError(404, "Blog not found");
    }
    console.log(blog.author);

    const user  = await User.findOne({_id: blog.author}).select("+password");
    if(!user){
        throw new AppError(400, "User not exists");
    }

    if(user.email !== userData.email)
    {
        throw new AppError(401, "You are not authorized");
    }

    if(user.isBlocked){
        throw new AppError(400, "User is blocked");
    }
    
    const result = await Blog.deleteOne(
        {_id: blogId},
        {new: true}
    );

    return result;
}
export const BlogServices = {
    getBlogsFromDb,
    createBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogFromDb
}