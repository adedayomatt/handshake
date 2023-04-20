class TransactionNotFoundException extends Error {
    constructor() {
        super("Transaction not found");
        this.status_code = 404;
    }
}

module.exports = TransactionNotFoundException;