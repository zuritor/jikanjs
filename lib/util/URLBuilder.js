const Settings = require('./Settings');

class URLBuilder {
  /**
   * is for bulding url of a given list of url parts and a optional list of query parameter
   * @param {Array} args - URL parts
   * @param {object} [parameter] - Query Parameter
   * @returns {string} URL
   */
  static build(args, parameter) {
    const url = new URL(Settings.url);

    url.pathname += `/${args.filter(x => x !== undefined).reduce((acc, cur) => `${acc}/${cur}`)}`;

    // append query parameters
    if (!Object.is(parameter, undefined)) {
      Object.entries(parameter).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    return url.href;
  }
}

module.exports = URLBuilder;
