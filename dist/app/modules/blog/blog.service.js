"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const blog_model_1 = require("./blog.model");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getBlogsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogSearchableFields = ['title', 'content'];
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find(), query)
        .search(blogSearchableFields)
        .filter()
        .sort();
    const result = yield blogQuery.modelQuery.populate("author");
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
});
const createBlogIntoDb = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userData.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(400, "User not exists");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(400, "User is blocked");
    }
    const newBlog = {
        title: payload.title,
        content: payload.content,
        author: user._id
    };
    const result = yield blog_model_1.Blog.create(newBlog);
    yield result.populate("author");
    const { _id, title, content, author } = result;
    return { _id, title, content, author };
});
const updateBlogIntoDb = (payload, userData, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(404, "Blog not found");
    }
    console.log(blog.author);
    const user = yield user_model_1.User.findOne({ _id: blog.author }).select("+password");
    if (!user) {
        throw new AppError_1.default(400, "User not exists");
    }
    if (user.email !== userData.email) {
        throw new AppError_1.default(401, "You are not authorized");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(400, "User is blocked");
    }
    const result = yield blog_model_1.Blog.findOneAndUpdate({ _id: blogId }, payload, { new: true }).populate("author");
    return result;
});
const deleteBlogFromDb = (userData, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(404, "Blog not found");
    }
    console.log(blog.author);
    const user = yield user_model_1.User.findOne({ _id: blog.author }).select("+password");
    if (!user) {
        throw new AppError_1.default(400, "User not exists");
    }
    if (user.email !== userData.email) {
        throw new AppError_1.default(401, "You are not authorized");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(400, "User is blocked");
    }
    const result = yield blog_model_1.Blog.deleteOne({ _id: blogId }, { new: true });
    return result;
});
exports.BlogServices = {
    getBlogsFromDb,
    createBlogIntoDb,
    updateBlogIntoDb,
    deleteBlogFromDb
};
