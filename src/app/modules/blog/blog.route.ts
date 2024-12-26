import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';


const router = express.Router();

router.get("/", BlogControllers.getBlogs);

router.post("/", 
auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(BlogValidation.blogCreateValidationSchema), BlogControllers.createBlog);

router.patch("/:id", 
auth(USER_ROLE.user), validateRequest(BlogValidation.blogUpdateValidationSchema), BlogControllers.updateBlog);

router.delete("/:id", 
    auth(USER_ROLE.user), BlogControllers.deleteBlog);
    

export const BlogRoutes = router;