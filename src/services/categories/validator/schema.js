import Joi from 'joi';

export const createCategoryPayloadSchema = Joi.object({
    name: Joi.string().required(),
});