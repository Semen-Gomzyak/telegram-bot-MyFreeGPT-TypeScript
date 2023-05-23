import Joi from 'joi';

const productValidateSchema = Joi.object({
    name: Joi.string().min(2).max(48).required(),
    price: Joi.number().required(),
    image: Joi.binary().required(),
    payment: Joi.string().required(),
    description: Joi.string().min(10).max(1000).required(),
    characteristics: Joi.array().items(
        Joi.object({
            description: Joi.string().min(10).max(200).required(),
        })
    ),
});

export default productValidateSchema;