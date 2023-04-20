const ExternalRequest = require("app/services/ExternalRequest");

class ClientGateway extends ExternalRequest {

    constructor(client) {
        super({ baseURL: client.base_url })
        this.client = client;
    }

}

module.exports = ClientGateway;