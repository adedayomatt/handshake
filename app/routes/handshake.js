const express = require("express");
const router = express.Router();
const HandshakerController = require("app/controllers/handshaker")
const {
    authenticateClient,
    authenticateClientPairing,
    validateHandshake,
    validateTransactionLog
} = require("app/middlewares");

router.post("/", [
    authenticateClient,
    authenticateClientPairing,
    validateTransactionLog,
    validateHandshake
], HandshakerController.handshake);

module.exports = router;