const joi = require('@hapi/joi');

const userNameSchema = joi.string();
const userLastNameSchema = joi.string();
const userEmailSCHEMA = joi.string().email();
const userPasswordSchema = joi.string();
const userYearSchema = joi.number();
const userGenderSchema = joi.string();
const userUrlSchema = joi.string().uri();

const logInUserSchema = {
    email: userEmailSCHEMA.required(),
    password: userPasswordSchema.required(),
};

const createUserSchema = {
    name: userNameSchema.required(),
    lastName: userLastNameSchema.required(),
    email: userEmailSCHEMA.required(),
    password: userPasswordSchema.required(),
    year: userYearSchema.required(),
    sexo: userGenderSchema.required(),
    url: userUrlSchema
};

const updateUserSchema = {
    name: userNameSchema,
    lastName: userLastNameSchema,
    email: userEmailSCHEMA,
    password: userPasswordSchema,
    year: userYearSchema,
    sexo: userGenderSchema,
    url: userUrlSchema
};

module.exports = {
    userEmailSCHEMA,
    logInUserSchema,
    createUserSchema,
    updateUserSchema,
};