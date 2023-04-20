class ClientPairNotFoundException extends Error {
    constructor() {
        super("Clients not paired");
        this.status_code = 404;
    }
}

module.exports = ClientNotFoundException;