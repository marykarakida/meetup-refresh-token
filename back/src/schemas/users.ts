import Joi from 'joi';

export const newUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
});

export const userSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
});
