import Joi from 'joi';

const taskValidateSchema = Joi.object({
    title: Joi.string().min(2).max(48).required(),
    description: Joi.string().min(10).max(1000).required(),
    priority: Joi.string().valid('low', 'middle', 'high').required(),
    expired_at: Joi.date().required(),
    status: Joi.string().valid('to_do', 'in_progress', 'done').required(),
    username: Joi.string()
})

export default taskValidateSchema;