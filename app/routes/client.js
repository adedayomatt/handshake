const express = require("express");
const { validate } = require("express-validation");
const validations = require("app/validations")
const router = express.Router();
const clientController = require("app/controllers/client")
const { authenticateClient } = require("app/middlewares")

router.get("/", [], clientController.allClients);
router.post("/", [validate(validations.createClient)], clientController.createClient);
router.get("/:id", [], clientController.getClient);
router.post("/pair/:partnerId", [ authenticateClient ], clientController.pairClient);

module.exports = router;