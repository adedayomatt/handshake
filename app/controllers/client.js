const Response = require("app/services/ServiceResponse")
const ClientHandler = require("app/handlers/client");

module.exports = {

    createClient: (req, res) => {
        ClientHandler.createClient(req.body)
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    },

    getClient: (req, res) => {
        ClientHandler.getClientById(req.params.id, ['partners', 'connectors'])
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    },

    allClients: (req, res) => {
        ClientHandler.getAllClients()
        .then(response => {
            (new Response(req, res)).success(response)
        })
        .catch(e => {
            (new Response(req, res)).error(e)
        })
    },

    pairClient: (req, res) => {
        ClientHandler.pairClient(req.client, req.params.partnerId)
            .then(response => {
                (new Response(req, res)).success(response)
            })
            .catch(e => {
                (new Response(req, res)).error(e)
            })
    },


}