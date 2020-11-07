const Joi = require("joi");

const restaurantSchema = Joi.object({
    id: Joi.number().required(),
    cuisines: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
});

const restaurantValidator = (data) => {
    return restaurantSchema.validate(data);
};

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports = { registerValidator, loginValidator, restaurantValidator };
