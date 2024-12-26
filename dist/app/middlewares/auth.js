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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, "You are not authorized");
        }
        const secret = '0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const { email, role } = decoded;
        const user = yield user_model_1.User.findOne({ email: email }).select('+password');
        if (!user) {
            throw new AppError_1.default(404, 'This user is not found!');
        }
        const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (isBlocked) {
            throw new AppError_1.default(403, 'This user is Blocked!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(401, "You are not authorized");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
