class InvalidRequestException extends Error {
    constructor() {
        super("Invalid Request");
        this.status_code = 400;
    }
}

module.exports = InvalidRequestException;