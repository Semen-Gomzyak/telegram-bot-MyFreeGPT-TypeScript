import { Request, Response } from "express";
import modelSchema from "../../models";

const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    const upTask = await modelSchema.Task.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(upTask);
}

export default updateTask;