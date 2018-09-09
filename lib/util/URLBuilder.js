//@ts-check
const Settings          = require('./Settings');

class URLBuilder {

    constructor () {
        
    }

    /**
     * is for bulding url of a given list of url parts and a optional list of query parameter 
     * @param {*[]} args           ULR Parts
     * @param {{}} parameter      [Optional] Query Parameter
     * @returns {String} url
     */
    build(args, parameter = null) {
        var url = Settings.getBaseURL();

        for(var i = 0; i < args.length; i++) {
            if(args[i]) url += '/' + args[i];
        }

        // append queryParameter
        if(parameter) url += this.query(parameter);

        return url;
    }

    /**
     * is for creating a string of a list of query parameter
     * @param {{}} parameter      [Optional] Query Parameter
     * @returns {String} 
     */
    query(parameter) {
        if(!parameter) return null; // in the case no parameter are given

        var query = '';
        var first = true;

        for (var key in parameter) {
            if(first) { query += `?${key}=${parameter[key]}`; first = false; }
            else query += `&${key}=${parameter[key]}`
        }
    
        return query;
    }
}

module.exports = URLBuilder;