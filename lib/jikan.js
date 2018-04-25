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

// TODO the three upcoming endpoints https://myanimelist.net/forum/?topicid=1616529
/**
 * Seasonal:
 * https://api.jikan.moe/season{/year/season}
 * https://api.jikan.moe/season // for current season
 * https://api.jikan.moe/season/2018/summer
 * 
 * Schedule:
 * https://api.jikan.moe/schedule // For the schedule listing of this seasons
 * 
 * Top:
 * https://api.jikan.moe/top/anime{/page}
 * https://api.jikan.moe/top/manga
 * https://api.jikan.moe/top/manga/2 // listing of page 2
 */

class JikanAPI {

    constructor() {
        this.url = 'https://api.jikan.moe';
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. characters_staff, episodes, news, pictures, videos, stats, forum, moreinfo
     * @param {number} pParameter       Optional
     */
    loadAnime(id, pRequest = null, pParameter = null) {
        return loadAPIData(urlBuilder([this.url, 'anime', id, pRequest, pParameter]));
    }


    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         Optional e.g. characters, news, pictures, stats, forum, moreinfo
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

    /**
     * 
     * @param {Number} year 
     * @param {string} season           only [summer, spring, fall, winter]
     */
    loadSeason(year, season) {
        return loadAPIData(urlBuilder([this.url, 'season', year, season]));
    }


    /**
     * 
     * @param {string} day              Optional; only [monday, tuesday, wednesday, thursday, friday, saturday, sunday] 
     */
    loadSchedule(day = null) {
        return loadAPIData(urlBuilder([this.url, 'schedule', day]));
    }

    /**
     * 
     * @param {string} type             only [anime, manga]
     * @param {Number} page             Optional
     * @param {string} subtype  	    Optional [Anime] airing, upcoming, tv, movie, ova, special [Manga] manga, novels, oneshots, doujin, manhwa, manhua [both] bypopularity, favorite
     */
    loadTop(type, page = null, subtype = null) {
        return loadAPIData(urlBuilder([this.url, 'top', type, page, subtype]));
    }

    /**
     * related to the Jikan REST Instance. --> see the official Jikan documentation [only uses the requests argument of the request parameter. For the status argument view the function loadStatus]
     * @param {string} type             e.g. anime, manga, characters, people, search, top, schedule, season
     * @param {string} period           e.g. today, weekly monthly
     */
    loadMeta(type, period) {
        return loadAPIData(urlBuilder([this.url, 'meta', 'requests', type, period]));
    }

    /**
     * is for loading the status of the Jikan REST Instance  --> see the official Jikan documentation [original part of the meta endpoint]
     */
    loadStatus() {
        return loadAPIData(urlBuilder([this.url, 'meta', 'status']));
    }

    /**
     * can be used for stuff not yet covered with the current Jikanjs wrapper version
     * @param {Array} parameter         e.g. [anime, 1] to load the anime with the id of 1 
     */
    raw(parameter) {
        if(!Array.isArray(parameter)) new Error(`The given parameter should be an array like [anime, 1] but given was ${parameter}`);
        var defaultParams = [this.url];
        
        return loadAPIData(urlBuilder(defaultParams.concat(parameter)));
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