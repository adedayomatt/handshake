const Joi = require('joi');
const FormValidator = require("app/services/validators/FormValidator")

class HandshakeValidator {

    constructor(initialRequest, data) {
        this.setInitialRequest(initialRequest);
        this.setData(data)
    }

    setInitialRequest(request) {
        this.initialRequest = request;
        this.initialResponse = (request ? JSON.parse(request.response) : {}).data || {}
        return this;
    }

    getInitialResponse() {
        return this.initialResponse || {}
    }

    setData(data) {
        this.data = data;
        return this;
    }

    getValidatorsForResponse(response) {
        return {
            form: new FormValidator(response).schema()
        }
    }

    setDefaultValidator() {
        const defaultValidators = this.getValidatorsForResponse(this.initialResponse);
        return this.setValidator(Joi.object({
            request_id: Joi.number().required(),
            submission: this.initialResponse && this.initialResponse.type && defaultValidators[this.initialResponse.type]
                ? defaultValidators[this.initialResponse.type]
                : Joi.any()
        }));
    }

    setValidator(validator) {
        this.validator = validator
        return this;
    }

    validate() {
        if(!this.validator) this.setDefaultValidator()
        return this.validator.validate(this.data);
    }

}

module.exports = HandshakeValidator;