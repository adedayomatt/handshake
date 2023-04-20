const Response = require("app/services/ServiceResponse")

module.exports = {
    init: (req, res) => {
        (new Response(req, res)).success([],"Successful")
    },
}