import { z } from "zod";

const blogCreateValidationSchema = z.object({
    body: z.object({
        title: z.string({required_error: "Title is required", invalid_type_error: "Tilte must be string"}),
        content: z.string({required_error: "Content is required", invalid_type_error: "Content must be string"}),
    })
});

const blogUpdateValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    })
});

export const BlogValidation = {
    blogCreateValidationSchema,
    blogUpdateValidationSchema
}