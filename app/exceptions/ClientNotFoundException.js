class ClientNotFoundException extends Error {
    constructor() {
        super("Invalid client");
        this.status_code = 404;
    }
}

module.exports = ClientNotFoundException;