/* eslint-disable */

const { assert } = require('chai');
const jikanjs = require('../lib/jikan');
const pkg = require('../package.json');

describe('Utilities', () => {
  describe('serializer', () => {
    const { serialize } = require('../lib/util/serializeSearch');

    it('should serialize search params without dates', () => {
      assert.isEmpty(serialize({}));
    });

    it('should serialize search params with start date', () => {
      assert.deepEqual(
        serialize({
          start_date: new Date('05 October 2011 14:48 UTC'),
        }),
        { start_date: '2011-10-05T14:48:00.000Z' },
      );
    });

    it('should serialize search params with dates and genre mode ', () => {
      assert.deepEqual(
        serialize({
          start_date: new Date('05 January 2001 UTC'),
          end_date: new Date('01 February 2001 UTC'),
          genre_exclude: false,
        }),
        {
          start_date: '2001-01-05T00:00:00.000Z',
          end_date: '2001-02-01T00:00:00.000Z',
          genre_exclude: 0,
        },
      );
    });
  });
});

// Ratelimiting
beforeEach(function(done) {
  this.timeout(10000);

  setTimeout(() => {
    done();
  }, 3000);
});

describe(`${pkg.name}/API/v2`, function() {
  this.timeout(10000);
  beforeEach(done => {
    jikanjs.settings.version = 2;
    done();
  });

  describe('#Anime', () => {
    it('should load anime', async () => {
      const response = await jikanjs.loadAnime(1);

      assert.equal(response.mal_id, 1, 'wrong ID, expected 1');
      assert.equal(response.title, 'Cowboy Bebop', 'wrong title, expected Cowboy Bebop');
    });

    it('should paginate through episodes', async () => {
      const response = await jikanjs.loadAnime(21, 'episodes', 2);

      assert.equal(response.mal_id, 21, 'wrong ID, expected 21');
      assert.equal(response.title, 'One Piece', 'wrong title, expected One Piece');
      assert.isNotEmpty(response.episode, "episodes array should't be empty");
      assert.equal(
        response.episode.length,
        100,
        'less or more than 100 episodes, expected to be 100',
      );
      assert.isAbove(response.episode_last_page, 7, 'expected more than 7 pages');
    });
  });

  describe('#Manga', () => {
    it('loaded manga', async () => {
      const response = await jikanjs.loadManga(2);

      assert.equal(response.mal_id, 2, 'wrong id, should be 2');
      assert.equal(response.title, 'Berserk', 'wrong title should be Berserk');
    });
  });

  describe('#Person', () => {
    it('loaded person', async () => {
      const response = await jikanjs.loadPerson(8);

      assert.equal(response.mal_id, 8, 'wrong id, should be 8');
      assert.equal(response.name, 'Rie Kugimiya', 'wrong name should be Rie Kugimiya');
    });
  });

  describe('#Character', () => {
    it('loaded character', async () => {
      const response = await jikanjs.loadCharacter(43280);

      assert.equal(response.mal_id, 43280, 'wrong id, should be 43280');
      assert.equal(response.name, 'Inori Yuzuriha', 'wrong name should be Inori Yuzuriha');
    });
  });

  describe('#Search', () => {
    it('search Anime', async () => {
      const response = await jikanjs.search('anime', 'One Piece');

      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('search Anime with less than 3 letters', async () => {
      const query = 'On';

      try {
        await jikanjs.search('anime', query);
      } catch (err) {
        assert.instanceOf(err, Error);
      }
    });

    it('advance search (search the current airing series One Piece)', async () => {
      const response = await jikanjs.search('anime', 'One Piece', {
        page: 1,
        type: 'tv',
        status: 'airing',
      });

      assert.isDefined(response.result, 'result should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });
  });

  describe('#Season', () => {
    it('load winter season of 2012', async () => {
      const response = await jikanjs.loadSeason(2012, 'winter');

      assert.isDefined(response.season, 'season should be defined');
      assert.equal(response.season_year, '2012', 'Season Year shoulb be 2012');
      assert.equal(response.season_name, 'Winter', 'Season name should be Winter');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.isAbove(response.season.length, 1, 'season should have minimum of one series');
    });
  });

  describe('#Schedule', () => {
    it('load the current shadule', async () => {
      const response = await jikanjs.loadSchedule();

      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('load shedule of monday', async () => {
      const response = await jikanjs.loadSchedule('monday');

      assert.isDefined(response.monday, 'monday should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });
  });

  describe('#Genre', () => {
    it('check if Error is displayed (Usable at API Version 3+)', async () => {
      try {
        await jikanjs.loadGenre('anime', 1);
      } catch (error) {
        assert.equal(error.message, 'Usable at API version 3+');
      }
    });
  });

  describe('#Producer', () => {
    it('check if Error is displayed (Usable at API Version 3+)', async () => {
      try {
        await jikanjs.loadProducer(1);
      } catch (error) {
        assert.equal(error.message, 'Usable at API version 3+');
      }
    });
  });

  describe('#Magazine', () => {
    it('check if Error is displayed (Usable at API Version 3+)', async () => {
      try {
        await jikanjs.loadMagazine(1);
      } catch (error) {
        assert.equal(error.message, 'Usable at API version 3+');
      }
    });
  });

  describe('#User', () => {
    it('check if Error is displayed (Usable at API Version 3+)', async () => {
      try {
        await await jikanjs.loadUser('zuritor');
      } catch (error) {
        assert.equal(error.message, 'Usable at API version 3+');
      }
    });
  });

  describe('#Top', () => {
    it('load anime top', async () => {
      const response = await jikanjs.loadTop('anime');

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('load anime top page 2', async () => {
      const response = await jikanjs.loadTop('anime', 2);

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.top[0].rank, 51, 'wrong rank');
    });

    it('load anime top page 1 and onyle for the subtype tv', async () => {
      const response = await jikanjs.loadTop('anime', 1, 'tv');

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.top[1].rank, 2, 'wrong rank');
      assert.equal(response.top[1].type, 'TV', 'type should by tv');
    });
  });

  describe('#Meta', () => {
    it('load meta data of type anime in the perioade weekly', async () => {
      const response = await jikanjs.loadMeta('anime', 'weekly');

      assert.isNotEmpty(response, 'response should not be empty');
    });
  });

  describe('#Status', () => {
    it('load status', async () => {
      const response = await jikanjs.loadStatus();

      assert.isNotEmpty(response, 'response should not be empty');
      assert.isDefined(response.cached_requests, 'cached_requests should be defined');
    });
  });

  describe('#Raw', () => {
    it('send a simple request', async () => {
      const response = await jikanjs.raw(['anime', 1]);

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.mal_id, 1, 'wrong id, should be 1');
      assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
    });
  });
});

describe(`${pkg.name}/API/v3`, function() {
  this.timeout(10000);

  beforeEach(done => {
    jikanjs.settings.version = 3;
    done();
  });

  describe('#Anime', () => {
    it('loaded anime', async () => {
      const response = await jikanjs.loadAnime(1);

      assert.equal(response.mal_id, 1, 'wrong id, should be 1');
      assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
    });

    it('episode request extension test', async () => {
      const response = await jikanjs.loadAnime(21, 'episodes', 2);

      assert.isNotEmpty(response.episodes, 'is not empty');
      assert.equal(response.episodes.length, 100, 'less or more than 100 episodes, should be 100');
      assert.isAbove(response.episodes_last_page, 7, 'not more than 7 pages, should be more');
    });
  });

  describe('#Manga', () => {
    it('loaded manga', async () => {
      const response = await jikanjs.loadManga(2);

      assert.equal(response.mal_id, 2, 'wrong id, should be 2');
      assert.equal(response.title, 'Berserk', 'wrong title should be Berserk');
    });
  });

  describe('#Person', () => {
    it('loaded person', async () => {
      const response = await jikanjs.loadPerson(8);

      assert.equal(response.mal_id, 8, 'wrong id, should be 8');
      assert.equal(response.name, 'Rie Kugimiya', 'wrong name should be Rie Kugimiya');
    });
  });

  describe('#Character', () => {
    it('loaded character', async () => {
      const response = await jikanjs.loadCharacter(43280);

      assert.equal(response.mal_id, 43280, 'wrong id, should be 43280');
      assert.equal(response.name, 'Inori Yuzuriha', 'wrong name should be Inori Yuzuriha');
    });
  });

  describe('#Search', () => {
    it('search Anime', async () => {
      const response = await jikanjs.search('anime', 'One Piece');

      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('search Anime with less than 3 letters', async () => {
      const query = 'On';

      try {
        await jikanjs.search('anime', query);
      } catch (err) {
        assert.instanceOf(err, Error);
      }
    });

    it('advance search (search the current airing series One Piece)', async () => {
      const response = await jikanjs.search('anime', 'One Piece', {
        page: 1,
        type: 'tv',
        status: 'airing',
      });

      assert.isDefined(response.results, 'result should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('advance search (search for 10 One Piece Movies)', async () => {
      const response = await jikanjs.search('anime', 'One Piece', {
        type: 'movie',
        page: 1,
        limit: 10,
      });

      assert.isDefined(response.results, 'expected result to be defined');
      assert.equal(response.results.length, 10, 'expected 10 elements');
      assert.isNotEmpty(response, 'expected result not to be empty');
    });
  });

  describe('#Season', () => {
    it('load winter season of 2012', async () => {
      const response = await jikanjs.loadSeason(2012, 'winter');

      assert.isDefined(response.anime, 'season should be defined');
      assert.equal(response.season_year, '2012', 'Season Year shoulb be 2012');
      assert.equal(response.season_name, 'Winter', 'Season name should be Winter');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.isAbove(response.anime.length, 1, 'season should have minimum of one series');
    });
  });

  describe('#Schedule', () => {
    it('load the current shadule', async () => {
      const response = await jikanjs.loadSchedule();

      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('load shedule of monday', async () => {
      const response = await jikanjs.loadSchedule('monday');

      assert.isDefined(response.monday, 'monday should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });
  });

  describe('#Genre', () => {
    it('load Animes of the genre Action Anime', async () => {
      const response = await jikanjs.loadGenre('anime', 1);

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.mal_url.mal_id, 1, 'returend genre should be 1');
      assert.isDefined(response.anime, 'anime should be defined');
    });
  });

  describe('#Producer', () => {
    it('load Producer information of Studio Pierrot', async () => {
      const response = await jikanjs.loadProducer(1);

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.meta.mal_id, 1, 'returend producer id should be 1');
      assert.isDefined(response.anime, 'anime should be defined');
    });
  });

  describe('#Magazine', () => {
    it('load information of the Magazine Big Comic Original', async () => {
      const response = await jikanjs.loadMagazine(1);

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.meta.mal_id, 1, 'returend magazine id should be 1');
      assert.isDefined(response.manga, 'manga should be defined');
    });
  });

  describe('#User', () => {
    it('load Userinformation of zuritor', async () => {
      const response = await jikanjs.loadUser('zuritor');

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.username, 'zuritor', 'returned username should be zuritor');
    });

    it('load Userinformation of zuritor (Anime History)', async () => {
      const response = await jikanjs.loadUser('zuritor', 'history', 'anime');

      assert.isNotEmpty(response, 'response should not be empty');
      assert.isDefined(response.history, 'history should be defined');
    });
  });

  describe('#Top', () => {
    it('load anime top', async () => {
      const response = await jikanjs.loadTop('anime');

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
    });

    it('load anime top page 2', async () => {
      const response = await jikanjs.loadTop('anime', 2);

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.top[0].rank, 51, 'wrong rank');
    });

    it('load anime top page 1 and onyle for the subtype tv', async () => {
      const response = await jikanjs.loadTop('anime', 1, 'tv');

      assert.isDefined(response.top, 'top should be defined');
      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.top[1].rank, 2, 'wrong rank');
      assert.equal(response.top[1].type, 'TV', 'type should by tv');
    });
  });

  describe('#Meta', () => {
    it('load meta data of type anime in the perioade weekly', async () => {
      const response = await jikanjs.loadMeta('anime', 'weekly');

      assert.isNotEmpty(response, 'response should not be empty');
    });
  });

  describe('#Status', () => {
    it('load status', async () => {
      const response = await jikanjs.loadStatus();

      assert.isNotEmpty(response, 'response should not be empty');
      assert.isDefined(response.cached_requests, 'cached_requests should be defined');
    });
  });

  describe('#Raw', () => {
    it('send a simple request', async () => {
      const response = await jikanjs.raw(['anime', 1]);

      assert.isNotEmpty(response, 'response should not be empty');
      assert.equal(response.mal_id, 1, 'wrong id, should be 1');
      assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
    });

    it('should throw due to invalid parameter', async () => {
      try {
        await jikanjs.raw(undefined);
      } catch (err) {
        assert.instanceOf(err, Error);
      }
    });
  });

  describe('Settings', () => {
    it('should get the api version', () => {
      assert.equal(jikanjs.settings.version, 3);
    });
    it('should get the host', () => {
      assert.equal(jikanjs.settings.host, 'api.jikan.moe');
    });
    it('should set the host', () => {
      jikanjs.settings.host = 'api.jikan.me';
      assert.equal(jikanjs.settings.host, 'api.jikan.me');
    });
  });
});
