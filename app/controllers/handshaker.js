const Response = require("app/services/ServiceResponse")
const Handshaker = require("app/handlers/handshake");
module.exports = {

    ping: (req, res) => {
        (new Response(req, res)).success([],"BNPL service is up")
    },

    handshake: (req, res) => {
         Handshaker.handshake({
             pair: req.pair,
             data: req.body,
             transactionLog: req.transactionLog,
         })
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    },
}