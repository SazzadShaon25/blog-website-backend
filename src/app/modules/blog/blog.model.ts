import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";
import { required } from "joi";

const blogSchema = new Schema<TBlog>({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author:{
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
}
)

export const Blog = model<TBlog>("Blog", blogSchema);