const { Client, ClientPair } = require("app/models");
const status = require("app/constants/status");
const { ClientNotFoundException, ClientPairException } = require("app/exceptions")

class ClientHandler {

    /**
     * Create new client
     *
     * @param {{}} attributes
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static async createClient(attributes = {}) {
       return await Client.create(attributes);
    }


    /**
     * Get a client by id
     *
     * @param {int} id
     * @param {string[]} include
     * @returns {Promise<Model<any, TModelAttributes>>}
     */

    static async getClientById(id,include = []) {
        const client = await Client.findByPk(id, { include });
        if(!client) throw new ClientNotFoundException;
        return client;
    }

    /**
     *
     * @param client
     * @param partnerId
     * @param include
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static async getClientPairByPartnerId(client, partnerId, include = []) {
        return await ClientPair.findOne({
            where: { client_id: client.id, partner_client_id: partnerId }, include
        })
    }

    /**
     * Update a client
     *
     * @param {int} id
     * @param {{}} attributes
     * @returns {Promise<Promise<[affectedCount: number, affectedRows: Model[]]> | Promise<[affectedCount: number]>>}
     */
    static async updateClient(id, attributes = {}) {
        try {
            await this.getClientById(id);
            return await Client.update(attributes, {
                where: { id }
            })
        } catch (e) { throw e }
    }

    /**
     * Get all available clients
     *
     * @returns {Promise<Model[]>}
     */

    static async getAllClients() {
        return await Client.findAll({
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    /**
     * Disable a client
     *
     * @param {int} id
     * @returns {Promise<[affectedCount: number,affectedRows: Model[]]|[affectedCount: number]>}
     */
    static async disableClient(id) {
        return await this.updateClient(id, {
            status: status.DISABLED
        });
    }

    /**
     * Pair client with another
     *
     * @param {Model} client
     * @param {int} partnerId
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static async pairClient(client, partnerId) {
        try {
            if(client.id == partnerId) throw new ClientPairException("Can't pair with self")
            const partner = await this.getClientById(partnerId);
            if(await this.getClientPairByPartnerId(client, partnerId)) throw new ClientPairException("Already paired")
            return await ClientPair.create({
                client_id: client.id,
                partner_client_id: partner.id
            })
        } catch (e) {
            if(e instanceof ClientNotFoundException) throw new ClientPairException("Partner not found")
            throw e
        }
    }
}

module.exports = ClientHandler