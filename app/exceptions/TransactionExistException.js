class TransactionExistException extends Error {
    constructor() {
        super("Transaction already exist");
        this.status_code = 500;
    }
}
module.exports = TransactionExistException;