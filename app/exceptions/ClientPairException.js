class ClientPairException extends Error {
    constructor(message) {
        super("Could not pair client: "+message);
        this.status_code = 500;
    }
}

module.exports = ClientPairException;