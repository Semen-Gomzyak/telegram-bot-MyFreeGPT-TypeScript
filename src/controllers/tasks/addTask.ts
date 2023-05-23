import modelSchema from "../../models";
import { Request, Response } from "express";

const addTask = async (req: Request, res: Response): Promise<any> => {
    const { username, title, description, expired_at, priority } = req.body;

    const storedUser = await modelSchema.User.findOne({ username });

    if (!storedUser) {
        return res.status(409).json("User not found, please try again later");
    }

    const task = {
        title,
        description,
        expired_at,
        priority
    };

    const savedTask = await modelSchema.Task.create({ ...task, owner: { _id: storedUser._id } });

     res.status(201).json(savedTask);
}

export default addTask;