const express = require("express");
const { validate } = require("express-validation");
const validations = require("app/validations")
const router = express.Router();
const transactionController = require("app/controllers/transaction")
const { authenticateClient } = require("app/middlewares")

router.post("/", [ authenticateClient, validate(validations.initiateTransaction) ], transactionController.initiateTransaction);
router.get("/:reference", [ authenticateClient ], transactionController.getTransaction);

module.exports = router;