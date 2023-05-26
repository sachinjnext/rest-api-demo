const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {

    register: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            avatar: Joi.string().allow(null, ''),
            firstName: Joi.string().required(),
            middleName: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().required(),
            address: Joi.string().allow(null, ''),
            password: Joi.string().required().min(8),
            cpassword: Joi.string().required().min(8)
        })
    })
}