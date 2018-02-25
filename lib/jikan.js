//@ts-check
const request               = require("request");

/**
 * Response Types:
 * 
 * 200: OK
 * 400: Bad Request             -> invalid endpoint
 * 404: Not Found               -> id doesnt exist
 * 405: Method Not Allowed      -> wrong request method
 * 429: Too Many Requests       -> request limit is hit.
 * 
 * Source: https://jikan.docs.apiary.io/
 */

function JikanAPI() {
	if(!(this instanceof JikanAPI)){
		return new JikanAPI();
    }

    this.url = 'https://api.jikan.me';
}


function processResponse(data) {
	var response = null;
    var error = null;

    if(data) {
        if(data.statusCode != 200){
			var e = JSON.parse(data.body)
			error = new Error(e.error);
			error.status = data.statusCode;
        }
        if(data.body){
			response = JSON.parse(data.body);
        }
    }

    return new Promise(function(resolve, reject) {
        if(error) reject(error);
        resolve(response);
    });

}

// #########################################################################################
//                              API function
// #########################################################################################

/**
 * 
 * @param {number} id 
 * @param {string} pRequest         Optional e.g. characters_staff, episodes, news, pictures, videos, stats
 * @param {number} pParameter       Optional
 */
JikanAPI.prototype.loadAnime = function(id, pRequest = null, pParameter = null) {
    return loadAPIData(urlBuilder([this.url, 'anime', id, pRequest, pParameter]));
}

/**
 * 
 * @param {number} id 
 * @param {string} pRequest         Optional e.g. characters, news, pictures, stats
 */
JikanAPI.prototype.loadManga = function(id, pRequest = null) {
    return loadAPIData(urlBuilder([this.url, 'manga', id, pRequest]));
}
/**
 * 
 * @param {number} id 
 * @param {string} pRequest         Optional e.g. pictures
 */
JikanAPI.prototype.loadPerson = function(id, pRequest = null) {
    return loadAPIData(urlBuilder([this.url, 'person', id, pRequest]));
}

/**
 * 
 * @param {number} id 
 * @param {string} pRequest         Optional e.g. pictures
 */
JikanAPI.prototype.loadCharacter = function(id, pRequest = null) {
    return loadAPIData(urlBuilder([this.url, 'character', id, pRequest]));
}

/**
 * 
 * @param {string} type             only [anime, manga, person, character] allowed - version 1.7.1
 * @param {string} query 
 * @param {number} page             Optional
 */
JikanAPI.prototype.search = function(type, query, page = null) {
    return loadAPIData(urlBuilder([this.url, 'search', type, query, page]));
}

// #########################################################################################
//                              Other functions
// #########################################################################################

/**
 * is for loading data
 * @param {string} url 
 */
var loadAPIData = function(url) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(error, response) {
            if(error) reject(error);
            resolve(processResponse(response))
        });
    });
}

/**
 * is for building a url from given url parts
 * @param {*} args 
 */
var urlBuilder = function(args) {
    var url = args[0];
    
    for(var i = 1; i < args.length; i++) {
        if(args[i]) url += '/' + args[i];
    }

    return url;
}


module.exports = new JikanAPI();