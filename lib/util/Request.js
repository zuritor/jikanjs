//@ts-check

const URLBuilder        = require('./URLBuilder');
const axios             = require('axios');

class Request {

    /**
     * 
     * @param {String} baseURL 
     */
    constructor (baseURL) {
        this.baseURL = baseURL;
        this.urlBuilder = new URLBuilder(this.baseURL);
    }

    /**
     * sends a request with the given list of URL parts and the optional list of query parameter
     * @param {*[]} args           ULR Parts
     * @param {{}} parameter      [Optional] Query Parameter
     * @returns {Promise<*>} returns the request response or an error
     */
    async send(args, parameter = null) {
        var url = this.urlBuilder.build(args, parameter); 

        try {
            var response = await axios.get(url);

            return Promise.resolve(response.data);
        } catch (error) {
            var e = new Error(error.response.data.error);
            e.url = url;
            e.status = error.response.status;

            return Promise.reject(e);
        }
    }
}

module.exports = Request;