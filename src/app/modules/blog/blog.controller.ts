import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const getBlogs: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await BlogServices.getBlogsFromDb(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blogs fetched successfully",
        data: result
    });
});

const createBlog: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await BlogServices.createBlogIntoDb(req.body, req.user);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Blog created successfully",
        data: result
    });
});

const updateBlog: RequestHandler = catchAsync(async(req, res, next)=>{
    const id = req.params.id;
    const result = await BlogServices.updateBlogIntoDb(req.body, req.user, id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog updated successfully",
        data: result
    });
});

const deleteBlog: RequestHandler = catchAsync(async(req, res, next)=>{
    const id = req.params.id;
    const result = await BlogServices.deleteBlogFromDb(req.user, id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blog deleted successfully",
    });
});

export const BlogControllers = {
    getBlogs,
    createBlog, 
    updateBlog,
    deleteBlog
}