"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
