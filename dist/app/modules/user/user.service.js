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
exports.UserServices = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("../blog/blog.model");
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("blocking user id", userId);
    const user = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, { isBlocked: true });
    if (!user) {
        throw new AppError_1.default(404, "User not exists");
    }
});
const deleteBlogFromDb = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(404, "Blog not found");
    }
    const result = yield blog_model_1.Blog.deleteOne({ _id: blogId }, { new: true });
    return result;
});
exports.UserServices = {
    blockUser,
    deleteBlogFromDb
};
