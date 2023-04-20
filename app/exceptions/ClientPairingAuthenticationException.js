class ClientPairingAuthenticationException extends Error {
    constructor(message = "") {
        super("Client pairing authentication failed: "+message);
        this.status_code = 401;
    }

}

module.exports = ClientPairingAuthenticationException;