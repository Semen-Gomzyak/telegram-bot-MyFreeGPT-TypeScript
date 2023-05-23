import { Request, Response, NextFunction } from "express";

const tryCatchWrapper = (enpoint: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await enpoint(req, res, next);
        } catch (error) {
            console.error(error)
        }
    };
};

export default tryCatchWrapper;