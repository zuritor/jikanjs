/* eslint class-methods-use-this: 0 */
const Request = require('./util/Request');
const Settings = require('./util/Settings');
const { serialize } = require('./util/serializeSearch');

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
    this.settings = Settings;
  }

  /**
   *
   * @param {number} id - Anime ID
   * @param {string} [request] - e.g. characters_staff, episodes, news, pictures,
   * videos, stats, forum, moreinfo
   * @param {number} [page] - Page number, only available on the episodes request
   */
  loadAnime(id, request, page) {
    return Request.send(['anime', id, request, page]);
  }

  /**
   *
   * @param {number} id
   * @param {string} [pRequest] - e.g. characters, news, pictures, stats, forum, moreinfo
   */
  loadManga(id, pRequest) {
    return Request.send(['manga', id, pRequest]);
  }

  /**
   *
   * @param {number} id
   * @param {string} [pRequest] - e.g. pictures
   */
  loadPerson(id, pRequest) {
    return Request.send(['person', id, pRequest]);
  }

  /**
   *
   * @param {number} id - Character ID
   * @param {string} [pRequest] - e.g. pictures
   */
  loadCharacter(id, pRequest) {
    return Request.send(['character', id, pRequest]);
  }

  /**
   * The query needs to be minium of 3 letters to be processes by MyAnimeList
   * @param {string} type - What type of search (anime, manga, person, character)
   * @param {string} query - This string overrides the `q` parameter
   * @param {Object} [params] - All search parameters are configured in this object
   * @param {number} [params.page] - Page number
   * @param {string} [params.type] - Resource type (tv, ova, movie, special, ona, music, manga,
   * novel,oneshot, doujin, manhwa, manhua)
   * @param {string} [params.status] - Airing status (airingm completed, complete (alias),
   * tba, upcoming (alias))
   * @param {string} [params.rated] - Age rating (g, pg, pg13, r17, r, rx)
   * @param {number} [params.genre] - Genre ID (from 1 to 43)
   * @param {number} [params.score] - Decimal from 0.0-10.0
   * @param {Date} [params.start_date] - Filter by start date, ISO8601 string
   * @param {Date} [params.end_date] - Filter by end date, ISO8601 string
   * @param {boolean} [params.genre_exclude] - Include/exclude the genres specified
   * @param {number} [params.limit] - Limit item results to the amount specified
   */
  search(type, query, params = {}) {
    if (query.length < 3) {
      return Promise.reject(
        new Error(
          `The given query must be of minimum 3 letters! Given query '${query}' has only ${
            query.length
          } letters.`,
        ),
      );
    }

    return Request.send(['search', type], serialize({ ...{ q: query }, ...params }));
  }

  /**
   *
   * @param {number} year
   * @param {string} season - One of [summer, spring, fall, winter]
   */
  loadSeason(year, season) {
    return Request.send(['season', year, season]);
  }

  /**
   *
   * @param {string} [day] - One of [monday, tuesday, wednesday, thursday, friday,
   * saturday, sunday, other (v3), unknown (v3)]
   */
  loadSchedule(day) {
    return Request.send(['schedule', day]);
  }

  /**
   *
   * @param {string} type - One of [anime, manga, people (v3), characters (v3)]
   * @param {number} [page] - Page number
   * @param {string} [subtype] - [Anime] airing, upcoming, tv, movie, ova, special
   * [Manga] manga, novels, oneshots, doujin, manhwa, manhua [both] bypopularity, favorite
   */
  loadTop(type, page, subtype) {
    return Request.send(['top', type, page, subtype]);
  }

  /**
   *
   * @param {string} type - only [anime, manga]
   * @param {number} id - genre id
   * @param {number} [page] - page number
   */
  loadGenre(type, id, page) {
    if (this.settings.version < 3) {
      return Promise.reject(new Error('Usable at API version 3+'));
    }

    return Request.send(['genre', type, id, page]);
  }

  /**
   *
   * @param {number} id               producer id
   * @param {number} [page] - page number
   */
  loadProducer(id, page) {
    if (this.settings.version < 3) {
      return Promise.reject(new Error('Usable at API version 3+'));
    }

    return Request.send(['producer', id, page]);
  }

  /**
   *
   * @param {Number} id - magazine id
   * @param {Number} [page] - page number
   */
  loadMagazine(id, page) {
    if (this.settings.version < 3) {
      return Promise.reject(new Error('Usable at API version 3+'));
    }

    return Request.send(['magazine', id, page]);
  }

  /**
   *
   * @param {string} username - Username
   * @param {string} [request] - One of [profile, history, friends]
   * @param {string} [data] - additional data see API docs
   */
  loadUser(username, request, data) {
    if (this.settings.version < 3) {
      return Promise.reject(new Error('Usable at API version 3+'));
    }

    return Request.send(['user', username, request, data]);
  }

  /**
   * Related to the Jikan REST Instance. --> see the official Jikan documentation
   * [only uses the requests argument of the request parameter.
   * For the status argument view the function loadStatus]
   *
   * @param {string} type - e.g. anime, manga, characters, people, search, top, schedule, season
   * @param {string} period - e.g. today, weekly monthly
   * @param {number} [offset] - Optional
   */
  loadMeta(type, period, offset) {
    return Request.send(['meta', 'requests', type, period, offset]);
  }

  /**
   * Used for viewing the status of the Jikan REST Instance
   * see the official Jikan documentation [original part of the meta endpoint]
   */
  loadStatus() {
    return Request.send(['meta', 'status']);
  }

  /**
   * Can be used for stuff not yet covered with the current JikanJS wrapper version
   * @param {Array} urlParts          e.g. [anime, 1] to load the anime with the id of 1
   * @param {object} [queryParams] - query Parameter. Needs to be a key value pair such as
   * {type: 'tv', status: 'airing'}
   */
  raw(urlParts, queryParams) {
    if (!Array.isArray(urlParts)) {
      return Promise.reject(
        new Error(`The given parameter should an array such as [anime, 1], found: ${urlParts}`),
      );
    }
    return Request.send(urlParts, queryParams);
  }
}

module.exports = new JikanAPI();
