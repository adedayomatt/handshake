const Joi = require('joi');

class FormValidator {

    constructor(data) {
        this.setData(data)
        this.types = {
            string: Joi.string(),
            number: Joi.number(),
        }
    }

    setData(data) {
        this.data = data;
        return this;
    }

    schema () {
        const fields = this.data ? this.data.fields || [] : [];
        const validations = {};
        for (let field of fields) {
            if(field.type && field.name) {
                let schema = this.types[field.type] || Joi.any();
                if(field.required) schema = schema.required()
                if(field.matchRegex) schema = schema.regex(new RegExp(field.matchRegex))
                validations[field.name] = schema
            }
        }
        return Joi.object(validations).required();
    }

}

module.exports = FormValidator;