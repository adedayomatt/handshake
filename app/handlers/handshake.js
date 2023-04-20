const ClientHandshake = require("app/services/ClientHandshake");
const { InvalidRequestException } = require("app/exceptions");
const TransactionHandler = require("app/handlers/transaction");
const { step_initiate } = require("app/constants/constants");
const JsonResponseComposer = require("app/services/composers/JsonResponseComposer")

class Handshaker extends TransactionHandler {

    /**
     *
     * @param pair
     * @param transactionLog
     * @param data
     * @returns {Promise<*|undefined>}
     */
     static async handshake({ pair, transactionLog, data }) {
        let transaction = null;
        const composer = new JsonResponseComposer(data.submission)
        try {
            if(transactionLog) {
                transaction = transactionLog.transaction
                composer.setInitialRequest(transactionLog)
            } else if (data.action === step_initiate ) {
                transaction = await this.initTransaction(pair.client, data.submission)
                composer.setAction(step_initiate)
            } else throw new InvalidRequestException
            return await (new ClientHandshake(pair))
                .setTransaction(transaction)
                .setData(composer.compose())
                .handshake()
        } catch (e) {  throw e  }
    }

}

module.exports = Handshaker