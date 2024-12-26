"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_contant_1 = require("../user/user.contant");
const router = express_1.default.Router();
router.get("/", blog_controller_1.BlogControllers.getBlogs);
router.post("/", (0, auth_1.default)(user_contant_1.USER_ROLE.admin, user_contant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.blogCreateValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.patch("/:id", (0, auth_1.default)(user_contant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.blogUpdateValidationSchema), blog_controller_1.BlogControllers.updateBlog);
router.delete("/:id", (0, auth_1.default)(user_contant_1.USER_ROLE.user), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
