const HttpClient = require("app/services/HttpClient")
const ExternalRequestException = require("app/exceptions/ExternalRequestException");

class ExternalRequest extends HttpClient {

    constructor(config) {
        super(config);
    }

    async get(url) {
        try {
            return (await this.rawGet(url)).data;
        } catch (e) {
            throw new ExternalRequestException(e)
        }
    }

    async post(url, data, config) {
        try {
            return (await this.rawPost(url, data, config)).data;
        } catch (e) {
            throw new ExternalRequestException(e)
        }
    }

}

module.exports = ExternalRequest;