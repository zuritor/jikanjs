//@ts-check
const Request               = require('./util/Request');

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
        this.request = new Request(this.url);
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         [Optional] e.g. characters_staff, episodes, news, pictures, videos, stats, forum, moreinfo
     * @param {number} pParameter       [Optional]
     */
    loadAnime(id, pRequest = null, pParameter = null) {
        return this.request.send(['anime', id, pRequest, pParameter]);
    }


    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         [Optional] e.g. characters, news, pictures, stats, forum, moreinfo
     */    
    loadManga(id, pRequest = null) {
        return this.request.send(['manga', id, pRequest]);
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         [Optional] e.g. pictures
     */    
    loadPerson(id, pRequest = null) {
        return this.request.send(['person', id, pRequest]);
    }

    /**
     * 
     * @param {number} id 
     * @param {string} pRequest         [Optional] e.g. pictures
     */
    loadCharacter(id, pRequest = null) {
        return this.request.send(['character', id, pRequest]);
    }

    /**
     * the query needs to be minium of 3 letters to be processes by MyAnimeList
     * @param {string} type             only [anime, manga, person, character] allowed - version 1.7.1
     * @param {string} query 
     * @param {number} page             [Optional]
     * @param {{}} params               [Optional] needs to be a key value pair like: {type: 'tv', status: 'airing'}
     */
    search(type, query, page = null, params = {}) {
        if(query.length < 3) return Promise.reject(new Error(`The given query must be of minium 3 letters! Given query '${query}' has only ${query.length} letters.`)); 
        return this.request.send(['search', type, query, page],params);
    }

    /**
     * 
     * @param {Number} year 
     * @param {string} season           only [summer, spring, fall, winter]
     */
    loadSeason(year, season) {
        return this.request.send(['season', year, season]);
    }


    /**
     * 
     * @param {string} day              [Optional]; only [monday, tuesday, wednesday, thursday, friday, saturday, sunday] 
     */
    loadSchedule(day = null) {
        return this.request.send(['schedule', day]);
    }

    /**
     * 
     * @param {string} type             only [anime, manga]
     * @param {Number} page             [Optional]
     * @param {string} subtype  	    [Optional] [Anime] airing, upcoming, tv, movie, ova, special [Manga] manga, novels, oneshots, doujin, manhwa, manhua [both] bypopularity, favorite
     */
    loadTop(type, page = null, subtype = null) {
        return this.request.send(['top', type, page, subtype]);
    }

    /**
     * related to the Jikan REST Instance. --> see the official Jikan documentation [only uses the requests argument of the request parameter. For the status argument view the function loadStatus]
     * @param {string} type             e.g. anime, manga, characters, people, search, top, schedule, season
     * @param {string} period           e.g. today, weekly monthly
     */
    loadMeta(type, period) {
        return this.request.send(['meta', 'requests', type, period]);
    }

    /**
     * is for loading the status of the Jikan REST Instance  --> see the official Jikan documentation [original part of the meta endpoint]
     */
    loadStatus() {
        return this.request.send(['meta', 'status']);
    }

    /**
     * can be used for stuff not yet covered with the current Jikanjs wrapper version
     * @param {*[]} urlParts          e.g. [anime, 1] to load the anime with the id of 1 
     * @param {{}} queryParameter     [Optional] query Parameter. Needs to be a key value pair like {type: 'tv', status: 'airing'}
     */
    raw(urlParts, queryParameter = null) {
        if(!Array.isArray(urlParts)) new Error(`The given parameter should be an array like [anime, 1] but given was ${urlParts}`);
        return this.request.send(urlParts, queryParameter);
    }
}

module.exports = new JikanAPI();