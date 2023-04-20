class ExternalRequestException extends Error {
    constructor(e) {
        super("External initialRequest failed");
        this.status_code = 500;
    }
}

module.exports = ExternalRequestException;