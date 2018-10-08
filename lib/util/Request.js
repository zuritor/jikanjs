const fetch = require('cross-fetch');
const URLBuilder = require('./URLBuilder');

class Request {
  /**
   * sends a request with the given list of URL parts and the optional list of query parameter
   * @param {Array} args - URL Parts
   * @param {object} [parameter] - Query Parameter
   * @returns {Promise<*>} returns the request response or an error
   */
  static async send(args, parameter) {
    return fetch(URLBuilder.build(args, parameter)).then(res => res.json());
  }
}

module.exports = Request;
