/**
 * Composes JSON back to the client
 */
class JsonResponseComposer {

    constructor(data) {
        if(data) this.setData(data);
    }

    setInitialRequest(initialRequest) {
        this.initialRequest = initialRequest;
        const initialResponse = JSON.parse(this.initialRequest.response) || {};
        return initialResponse.data.action ? this.setAction(initialResponse.data.action) : this;
    }

    setAction(action) {
        this.action = action;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    compose() {
        return {
            action: this.action,
            submission: this.data
        }
    }
}

module.exports = JsonResponseComposer