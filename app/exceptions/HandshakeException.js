
class HandshakeException extends Error {
    constructor(e, pair) {
        super();
        if(e.code === "ENOTFOUND") this.message = `${pair.partner.name} is current not available`
        else this.message = `There was an error communicating to ${pair.partner.name}. ${e.message}`
        this.status_code = 500;
    }
}

module.exports = HandshakeException;