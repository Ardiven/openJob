import Joi from "joi";

export const createJobPayloadSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.string().required(),
    company_id: Joi.string().required(),
    salary_min: Joi.number().optional(),
    salary_max: Joi.number().optional(),
    job_type: Joi.string().required(),
    experience_level: Joi.string().required(),
    location_type: Joi.string().required(),
    location_city: Joi.string().optional(),
    is_salary_visible: Joi.boolean().optional(),
    status: Joi.string().required(),
});