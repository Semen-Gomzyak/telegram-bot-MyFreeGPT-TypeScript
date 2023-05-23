import { Request, Response } from "express";
import modelSchema from "../../models";

interface QueryOptions {
    owner?: string;
    $or?: {
        id?: { $regex: string; $options: string };
        description?: { $regex: string; $options: string };
        title?: { $regex: string; $options: string };
        status?: { $regex: string; $options: string };
        priority?: { $regex: string; $options: string };
    }[];
    status?: string;
    priority?: string;
}

type SortOrder = 1 | -1;

interface SortOptions {
    createdAt?: SortOrder;
    title?: SortOrder;
}

const getTasks = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 20, search, sort, id, username, status, priority } = req.query;

    const query: QueryOptions = {};

    const checkOwnership = await modelSchema.User.findOne({ username });

    if (checkOwnership) {
        const ownerUserId = checkOwnership._id;

        query.owner = ownerUserId;

        if (search) {
            const searchValue = { $regex: String(search), $options: 'i' };
            query.$or = [
                { id: searchValue },
                { description: searchValue },
                { title: searchValue },
                { status: searchValue },
                { priority: searchValue },
            ];
        }

        if (status) {
            query.status = String(status);
        }

        if (priority) {
            query.priority = String(priority);
        }

        const sortOptions: SortOptions = {};

        switch (sort) {
            case 'oldest':
                sortOptions.createdAt = 1;
                break;
            case ' az':
                sortOptions.title = 1;
                break;
            case 'za':
                sortOptions.title = -1;
                break;
            default:
                sortOptions.createdAt = -1;
                break;
        }

        const skip = (Number(page) - 1) * Number(limit);

        let tasks;

        if (id) {
            tasks = await modelSchema.Task.findById(id);
        } else {
            tasks = await modelSchema.Task.find(query)
                .sort(sortOptions as { [key: string]: SortOrder })
                .collation({ locale: 'en' })
                .skip(skip)
                .limit(Number(limit))
                .lean();
        }

        res.status(200).json(tasks);
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

export default getTasks;