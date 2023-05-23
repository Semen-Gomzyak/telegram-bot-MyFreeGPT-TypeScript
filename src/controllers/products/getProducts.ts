import { Request, Response } from "express";
import modelSchema from "../../models";

interface QueryOptions {
    id?: { $regex: string; $options: string };
}

type SortOrder = 1 | -1 | 'asc' | 'desc';

interface SortOptions {
    createdAt?: SortOrder;
    title?: SortOrder;
}

const getProducts = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 20, search, sort, id } = req.query;

    const query: QueryOptions = {};

    if (search) {
        query.id = { $regex: String(search), $options: 'i' };
    }

    const sortOptions: SortOptions = {};

    switch (sort) {
        case 'oldest':
            sortOptions.createdAt = 1;
            break
        case 'az':
            sortOptions.title = 1;
            break
        case 'za':
            sortOptions.title = -1;
            break
        default:
            sortOptions.createdAt = -1;
            break;
    }

    const skip = (Number(page) - 1) * Number(limit);

    let products;
    if (id) {
        products = await modelSchema.Product.findById(id);
    } else {
        products = await modelSchema.Product.findOneAndDelete(query)
            .sort(sortOptions as { [key: string]: SortOrder })
            .skip(skip)
            .limit(Number(limit));
    }

    res.status(200).json(products);
};

export default getProducts;