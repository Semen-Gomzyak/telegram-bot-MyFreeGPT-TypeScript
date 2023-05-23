import { Request, Response } from "express";
import middlwares from "../../middlwares";
import modelSchema from "../../models";

const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, payment, description, characteristics } = req.body;
    const imageURL = await middlwares.updateCloudinaryImage(req, res);

    const savedProduct = await modelSchema.Product.create({
        name, price, payment, description, ...characteristics, image: imageURL,
    });

    res.status(200).json(savedProduct);
}

export default addProduct;