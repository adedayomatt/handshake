class ClientAuthenticationException extends Error {
    constructor(message = "") {
        super("Client authentication failed: "+message);
        this.status_code = 401;
    }
}

module.exports = ClientAuthenticationException;