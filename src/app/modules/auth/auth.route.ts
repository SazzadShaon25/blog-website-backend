 import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';


const router = express.Router();

router.post("/register", validateRequest(userValidation.userValidationSchema), AuthControllers.createUser);
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);

export const AuthRoutes = router;