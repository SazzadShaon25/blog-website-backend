import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.patch("/users/:userId/block", 
auth(USER_ROLE.admin), UserControllers.blockUser);

router.patch("/blogs/:id", 
    auth(USER_ROLE.admin), UserControllers.deleteBlog);

export const UserRoutes = router;