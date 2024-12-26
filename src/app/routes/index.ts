import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();
router.use("/auth", AuthRoutes)
router.use("/blogs", BlogRoutes)
router.use("/admin", UserRoutes)

export default router;