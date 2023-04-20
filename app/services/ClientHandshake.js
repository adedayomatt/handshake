const ClientGateway = require("app/services/ClientGateway");
const status = require("app/constants/status");
const { TransactionLog } = require("app/models");
const HandshakeException = require("app/exceptions/HandshakeException");

class ClientHandshake {

    constructor(pair) {
        this.pair = pair;
        this.setSender(pair.client)
        this.setReceiver(pair.partner)
        this.setGateway(new ClientGateway(pair.partner))
    }

    setSender(client) {
        this.sender = client;
        return this;
    }

    setReceiver(client) {
        this.receiver = client;
        return this;
    }

    setData(data){
        this.data = data;
        return this
    }

    setTransaction(transaction) {
        if(!transaction) return this;
        this.transaction = transaction;

        this.gateway.setRequestInterceptor(async req => {
            this.transactionLog = await TransactionLog.create({
                url: req.baseURL+req.url,
                request: JSON.stringify({
                    method: req.method,
                    data: req.data,
                }),
                transaction_id: transaction.id,
                client_pair_id: this.pair.id
            });
            return req;
        })

        this.gateway.setResponseInterceptor(
            res =>  {
            if(this.transactionLog) {
                TransactionLog.update({
                    status: status.SUCCESS,
                    response: JSON.stringify({
                        data: res.data,
                        status: res.status
                    })
                }, { where: { id: this.transactionLog.id }})
                res.transactionLog = this.transactionLog
            }
            return res;
        },
            error => {
            if(this.transactionLog) {
                TransactionLog.update({
                    status: status.FAILED,
                    response: JSON.stringify({
                        code: error.code,
                        message: error.message,
                        response: error.response,
                    })
                }, { where: { id: this.transactionLog.id }})
            }
            return Promise.reject(error)
        })
        return this;
    }

    setGateway(gateway) {
        this.gateway = gateway;
        return this;
    }

    async handshake() {
        console.log(`Sending from ${this.sender.name} to ${this.receiver.name}...`, this.data);
        try {
            const response = await this.gateway.rawPost(this.receiver.request_path, this.data)
            console.log("Received--->", response.data);
            const data = response.data;
            if(response.transactionLog) {
                data.request_id = response.transactionLog.id
            }
            return data;
        } catch (e) {
            throw new HandshakeException(e, this.pair)
        }
    }
}

module.exports = ClientHandshake;