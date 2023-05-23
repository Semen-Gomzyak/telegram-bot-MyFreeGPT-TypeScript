import modelSchema from "../../models";
import { Request, Response } from "express";

const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;
    await modelSchema.Task.findByIdAndRemove(id);

     res.status(200).json({ message: 'Task deleted' });
}

export default deleteTask;