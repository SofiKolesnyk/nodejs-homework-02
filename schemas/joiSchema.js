const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string(),
    email: Joi.string(),
    favorite: Joi.boolean(),
});

const updateFavoriteContactValidator = (data) => { 
    const schema = Joi.object({ 
        favorite: Joi.boolean() 
            .required() 
            .messages({ "any.required": `missing field favorite` }), 
    }); 
    return schema.validate(data); 
};

module.exports = {
    schema, 
    updateFavoriteContactValidator
};