"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_contant_1 = require("../user/user.contant");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.patch("/users/:userId/block", (0, auth_1.default)(user_contant_1.USER_ROLE.admin), user_controller_1.UserControllers.blockUser);
router.patch("/blogs/:id", (0, auth_1.default)(user_contant_1.USER_ROLE.admin), user_controller_1.UserControllers.deleteBlog);
exports.UserRoutes = router;
