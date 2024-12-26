import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';


const auth = (...requiredRoles : TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        throw new AppError(401, "You are not authorized")
    }

    const secret = '0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d'

    const decoded = jwt.verify(
        token,
        secret,
    ) as JwtPayload;

    const {email, role} = decoded;

    const user = await User.findOne({email:email}).select('+password');

    if (!user) {
        throw new AppError(404, 'This user is not found!');
    }

    const isBlocked = user?.isBlocked;

    if (isBlocked) {
        throw new AppError(403, 'This user is Blocked!');
    }

    if(requiredRoles && !requiredRoles.includes(role)){
        throw new AppError(401, "You are not authorized")
    }

    req.user = decoded;
    next();
  });
};

export default auth;