const joi = require('@hapi/joi');

const userNameSchema = joi.string();
const userLastNameSchema = joi.string();
const userEmailSCHEMA = joi.string().email();
const userPasswordSchema = joi.string();
const userGenderSchema = joi.string();

const logInUserSchema = {
    email: userEmailSCHEMA.required(),
    password: userPasswordSchema.required(),
};


const createUserSchema = {
    name: userNameSchema.required(),
    lastName: userLastNameSchema.required(),
    email: userEmailSCHEMA.required(),
    password: userPasswordSchema.required(),
    sexo: userGenderSchema.required()
};

const updateUserSchema = {
    name: userNameSchema,
    lastName: userLastNameSchema,
    email: userEmailSCHEMA,
    password: userPasswordSchema,
    sexo: userGenderSchema
};

module.exports = {
    userEmailSCHEMA,
    logInUserSchema,
    createUserSchema,
    updateUserSchema
};