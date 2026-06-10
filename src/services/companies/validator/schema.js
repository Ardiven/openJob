import Joi from "joi";

export const createCompanyPayloadSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
});

export const updateCompanyPayloadSchema = Joi.object({
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    description: Joi.string().optional(),
});