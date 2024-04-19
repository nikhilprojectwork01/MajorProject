// here we are definig schema with the help of joi this is not the mongoose schemsn this is the server side schema this is ddone for the server side validation 
const Joi = require('joi');
module.exports.ListingsSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        Country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image:Joi.string().allow(" " , null),
    }).required()
})