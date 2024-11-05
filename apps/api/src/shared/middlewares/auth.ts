import { NextFunction, Request, Response } from 'express';

export const AuthGuard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user) {
        return next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
};
