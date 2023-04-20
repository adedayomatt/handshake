const { Joi } = require('express-validation');

module.exports = {

    createClient: {
        body: Joi.object({
            name: Joi.string().required(),
            base_url: Joi.string().required(),
            request_path: Joi.string().required()
        })
    },

    initiateTransaction: {
        body: Joi.object({
            reference: Joi.string().required(),
            amount: Joi.number().required()
        })
    }
};
