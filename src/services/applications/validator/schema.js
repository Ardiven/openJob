import Joi from "joi";

export const createApplicationPayloadSchema = Joi.object({
    job_id: Joi.string().required(),
    user_id: Joi.string().required(),
    status: Joi.string().required(),
});