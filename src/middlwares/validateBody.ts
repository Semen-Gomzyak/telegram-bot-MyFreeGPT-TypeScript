import { Request, Response, NextFunction } from "express";
import HttpError from "./HttpError";

function validateBody(schema: any) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }

        return next;
    };
}

export default validateBody;