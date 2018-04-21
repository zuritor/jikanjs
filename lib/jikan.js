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

class JikanAPI {

    constructor() {
        this.url = 'https://api.jikan.moe';
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. characters_staff, episodes, news, pictures, videos, stats
     * @param {number} pParameter       Optional
     */
    loadAnime(id, pRequest = null, pParameter = null) {
        return loadAPIData(urlBuilder([this.url, 'anime', id, pRequest, pParameter]));
    }


    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. characters, news, pictures, stats
     */    
    loadManga(id, pRequest = null) {
        return loadAPIData(urlBuilder([this.url, 'manga', id, pRequest]));
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. pictures
     */    
    loadPerson(id, pRequest = null) {
        return loadAPIData(urlBuilder([this.url, 'person', id, pRequest]));
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. pictures
     */
    loadCharacter(id, pRequest = null) {
        return loadAPIData(urlBuilder([this.url, 'character', id, pRequest]));
    }

    /**
     * the query needs to be minium of 3 letters to be processes by MyAnimeList
     * @param {string} type             only [anime, manga, person, character] allowed - version 1.7.1
     * @param {string} query 
     * @param {number} page             Optional
     */
    search(type, query, page = null) {
        if(query.length < 3) {
            var error = new Error(`The given query must be of minium 3 letters! Given query '${query}' has only ${query.length} letters.`);
            error.status = 400;
            return 
        }
    
        return loadAPIData(urlBuilder([this.url, 'search', type, query, page]));
    }
}

// #########################################################################################
//                              Other functions
// #########################################################################################

/**
 * is for precessing the Jikan API Response
 * @param {*} data 
 */
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