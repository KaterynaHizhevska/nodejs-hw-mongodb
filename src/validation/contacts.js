import Joi from "joi";

export const createContactsSchema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
        'string.base': 'Username has to be a string',
        'string.min': 'Username requires at least {#limit} characters',
        'string.max': 'Username must be no longer than {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(6).max(20).required().messages({
        'string.base': 'Phone number must be a valid string',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().min(3).max(20).email().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
        'string.base': 'Username has to be a string',
        'string.min': 'Username requires at least {#limit} characters',
        'string.max': 'Username must be no longer than {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(6).max(20).required().messages({
        'string.base': 'Phone number must be a valid string',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().min(3).max(20).email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});
