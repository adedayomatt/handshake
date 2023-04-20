const { Joi, ValidationError } = require('express-validation');
const { RequestLog, Client, ClientPair, TransactionLog } = require('app/models');
const ServiceResponse = require("app/services/ServiceResponse");
const HandshakerValidator = require("app/services/HandshakeValidator");
const { step_initiate } = require("app/constants/constants");
const { initiateTransaction } = require("app/validations")
const {
    ClientAuthenticationException,
    ClientPairingAuthenticationException,
    InvalidRequestException
} = require("app/exceptions")
const status = require("app/constants/status");

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    requestLogger: async (req, res, next) => {
        try {
            req.log = await RequestLog.create({
                endpoint: req.originalUrl,
                method: req.method,
                request: JSON.stringify({
                    params: req.params,
                    payload: req.body,
                    headers: req.headers,
                })
            })
        } catch (e) {
            console.log("Could not log initialRequest--->", e)
        }
        next();
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    authenticateClient: async (req, res, next) => {
        try {
            const secretHeader = req.headers['client-secret'];
            if(!secretHeader) throw new ClientAuthenticationException("Client secret header missing")
            const client =  await Client.findOne({
                where: { secret: secretHeader }
            })
            if(!client) throw new ClientAuthenticationException("Invalid client")
            if(req.log) await req.log.update({ client_id: client.id });
            req.client = client;
        } catch (e) {
            return (new ServiceResponse(req, res)).error(e);
        }
        next();
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    authenticateClientPairing: async (req, res, next) => {
        try {
            if(!req.client) throw new ClientAuthenticationException
            const secretHeader = req.headers['pair-secret'];
            if(!secretHeader) throw new ClientPairingAuthenticationException("Pair secret header missing")
            const pair =  await ClientPair.findOne({
                where: {
                    client_id: req.client.id,
                    secret: secretHeader,
                }, include: ['client', 'partner']
            })
            if(!pair) throw new ClientPairingAuthenticationException
            if(pair.status === status.DISABLED) throw new ClientPairingAuthenticationException("Pair not enabled")
            req.pair = pair;
        } catch (e) {
            return (new ServiceResponse(req, res)).error(e);
        }
        next();
    },


    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    validateTransactionLog: async (req, res, next) => {
        try {
            if(!req.pair) throw new ClientPairingAuthenticationException
            if(req.body.request_id) {
                req.transactionLog = await TransactionLog.findOne({
                    where: { id: req.body.request_id, client_pair_id: req.pair.id },
                    include: ['transaction', 'pair']
                });
                if(!req.transactionLog) throw new InvalidRequestException
            }
        } catch (e) {
            return (new ServiceResponse(req, res)).error(e);
        }
        next();
    },

    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    validateHandshake: async (req, res, next) => {
        let validator = new HandshakerValidator();
        if(req.transactionLog) {
            validator.setInitialRequest(req.transactionLog);
        } else if (req.body.action === step_initiate) {
            validator.setValidator(Joi.object(
                {
                    action: Joi.string(),
                    submission: initiateTransaction.body
                }
            ))
        }
        const validation = validator.setData(req.body).validate();
        if(validation.error) {
            return (new ServiceResponse(req, res)).error({
                status_code: 400,
                message: "Invalid Request",
                error: {
                    message: validation.error.message,
                    details: validation.error.details
                }
            });
        }
        next();
    },

    /**
     *
     * @param err
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    handleError: (err, req, res, next) => {
        if (err instanceof ValidationError) {
            return (new ServiceResponse(req, res)).error(err);
        }
        return (new ServiceResponse(req, res)).error({
            status_code: 500,
            message: "Internal server error",
            error: err
        });
    }
}