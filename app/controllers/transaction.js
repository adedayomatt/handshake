const Response = require("app/services/ServiceResponse")
const TransactionHandler = require("app/handlers/transaction");

module.exports = {

    initiateTransaction: (req, res) => {
        TransactionHandler.initTransaction(req.client, req.body)
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    },

    getTransaction: (req, res) => {
        TransactionHandler.getTransactionByReference(req.client, req.params.reference)
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    }
}