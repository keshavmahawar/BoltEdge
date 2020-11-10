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

const restaurantArrayValidator = (data) => {
    const restaurantArraySchema = Joi.array()
        .items(restaurantSchema)
        .max(5)
        .min(1);

    return restaurantArraySchema.validate(data);
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

const passwordValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const phoneNoValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        phoneNo: Joi.string().min(10).required(),
    });
    return schema.validate(data);
};

const bussinessDetailsValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        gstNo: Joi.string().min(15).required(),
        fssaiNo: Joi.string().min(14).required(),
    });
    return schema.validate(data);
};

module.exports = {
    registerValidator,
    loginValidator,
    restaurantValidator,
    restaurantArrayValidator,
    passwordValidator,
    phoneNoValidator,
    bussinessDetailsValidator,
};
