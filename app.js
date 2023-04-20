const express = require('express');
const cors = require('cors');
const config = require('app/config/config');
const Response = require('app/services/ServiceResponse')
const routes = require("app/routes");
const { requestLogger, handleError } = require("app/middlewares")

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());
app.use(requestLogger);

app.use("/v1/client", routes.client);
app.use("/v1/handshake", routes.handshake);
app.use("/v1/transaction", routes.transaction);

app.use("/", (req, res) => {
    (new Response(req, res)).error({
        status_code: 404,
        message: "Not Found"
    })
});

app.use(handleError)

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});