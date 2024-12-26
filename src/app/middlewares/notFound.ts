import { Request, Response, NextFunction, RequestHandler } from "express";

// Handle 404 (Not Found) as a middleware
const notFound: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
   res.status(404).json({
    success: false,
    message: "API Not Found",
    error: ""
  });
};

export default notFound;
