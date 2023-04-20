const { Transaction, TransactionLog } = require("app/models");
const { TransactionNotFoundException, TransactionExistException } = require("app/exceptions")

class TransactionHandler {

    /**
     * Initiate a new transaction
     *
     * @param client
     * @param attributes
     * @returns {Promise<*>}
     */
     static async initTransaction(client, attributes = {}) {
        // if( await Transaction.findOne({
        //     where: { client_id: client.id, reference: attributes.reference  }
        // })) throw new TransactionExistException;
        return await Transaction.create({ client_id: client.id , ...attributes })
    }

    /**
     * Get transaction by reference
     *
     * @param client
     * @param reference
     * @returns {Promise<unknown>}
     */
    static async getTransactionByReference(client, reference, include = ['client']) {
        const transaction = await Transaction.findOne({
            where: { client_id: client.id, reference }, include
        })
        if(!transaction) throw new TransactionNotFoundException
        return transaction
    }

    /**
     * Get transaction by its log id
     *
     * @param logId
     * @returns {Promise<*>}
     */
    static async getTransactionByLogId(logId) {
        const log = await TransactionLog.findByPk(logId, {
            include: 'transaction'
        })
        if(!log) throw new TransactionNotFoundException
        return log.transaction;
    }

}

module.exports = TransactionHandler