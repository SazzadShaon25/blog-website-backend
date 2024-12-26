"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required", invalid_type_error: "Name must be string" }),
        email: zod_1.z.string({ required_error: "Email is required", invalid_type_error: "Email must be string" }),
        password: zod_1.z.string({
            required_error: "Password is required", invalid_type_error: "Password must be string"
        })
            .min(8, { message: "Passwrod must be atleast 8 characters" }),
    })
});
exports.userValidation = {
    userValidationSchema
};
