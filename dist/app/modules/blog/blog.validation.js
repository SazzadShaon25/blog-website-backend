"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blogCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required", invalid_type_error: "Tilte must be string" }),
        content: zod_1.z.string({ required_error: "Content is required", invalid_type_error: "Content must be string" }),
    })
});
const blogUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
    })
});
exports.BlogValidation = {
    blogCreateValidationSchema,
    blogUpdateValidationSchema
};
