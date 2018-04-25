//@ts-check
'use strict';

const assert                        = require('chai').assert;
const jikanjs                       = require('../lib/jikan');
const pkg                           = require('../package');


describe(`${pkg.name}/Client`, function() {

    this.timeout(10000);

    describe('#Anime', function() {

        it('loaded anime', async function() {
            const response = await jikanjs.loadAnime(1);

            assert.equal(response.mal_id, 1, 'wrong id, should be 1');
            assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
        })

        it('episode request extension test', async function() {
            const response = await jikanjs.loadAnime(21, 'episodes', 2);
            
            assert.equal(response.mal_id, 21, 'wrong id, should be 21');
            assert.equal(response.title, 'One Piece', 'wrong title should be One Piece');
            assert.isNotEmpty(response.episode, 'is not empty');
            assert.equal(response.episode.length, 100, 'less or more than 100 episodes, should be 100');
            assert.isAbove(response.episode_last_page, 7, 'not more than 7 pages, should be more');
        })
    })

    describe('#Manga', function() {
        it('loaded manga',  async function() {
            const response = await jikanjs.loadManga(2);

            assert.equal(response.mal_id, 2, 'wrong id, should be 2');
            assert.equal(response.title, 'Berserk', 'wrong title should be Berserk');
        })
    })

    describe('#Person', function() {
        it('loaded person', async function() {
            const response = await jikanjs.loadPerson(8);

            assert.equal(response.mal_id, 8, 'wrong id, should be 8');
            assert.equal(response.name, 'Rie Kugimiya', 'wrong name should be Rie Kugimiya');
        })
    })

    describe('#Character', function() {
        it('loaded character', async function() {
            const response = await jikanjs.loadCharacter(43280);

            assert.equal(response.mal_id, 43280, 'wrong id, should be 43280');
            assert.equal(response.name, 'Inori Yuzuriha', 'wrong name should be Inori Yuzuriha');
        })
    })

    describe('#Search', function() {
        it('search Anime', async function() {
            const response = await jikanjs.search('anime', 'One Piece');

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('search Anime with less than 3 letters', async function() {
            var query = 'On';

            try {
                await jikanjs.search('anime', query);
    
            } catch (error) {
                assert.equal(error.message, `The given query must be of minium 3 letters! Given query '${query}' has only ${query.length} letters.`);
                assert.equal(error.status, 400);
            }
        })
    })

    describe('#Season', function() {
        it('load winter season of 2012', async function() {
            const response = await jikanjs.loadSeason(2012, 'winter');

            assert.isDefined(response.season, 'season should be defined');
            assert.isNotEmpty(response, 'response should not be empty');
            assert.isAbove(response.season.length, 1, 'season should have minimum of one series');
        })
    }) 

    describe('#Schedule', function() {
        it('load the current shadule', async function() {
            const response = await jikanjs.loadSchedule();

            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('load shedule of monday', async function() {
            const response = await jikanjs.loadSchedule('monday');

            assert.isDefined(response.monday, 'monday should be defined');
            assert.isNotEmpty(response, 'response should not be empty');
        })
    })

    describe('#Top', function() {
        it('load anime top', async function() {
            const response = await jikanjs.loadTop('anime');

            assert.isDefined(response.top, 'top should be defined');
            assert.isNotEmpty(response, 'response should not be empty');
        })

        it('load anime top page 2', async function() {
            const response = await jikanjs.loadTop('anime', 2);

            assert.isDefined(response.top, 'top should be defined');
            assert.isNotEmpty(response, 'response should not be empty');
            assert.equal(response.top[0].rank, 51, 'wrong rank');
        })

        it('load anime top page 1 and onyle for the subtype tv', async function() {
            const response = await jikanjs.loadTop('anime', 1, 'tv');

            assert.isDefined(response.top, 'top should be defined');
            assert.isNotEmpty(response, 'response should not be empty');
            assert.equal(response.top[1].rank, 2, 'wrong rank');
            assert.equal(response.top[1].type, 'TV', 'type should by tv');
        })
    })

    describe('#Meta', function() {
        it('load meta data of type anime in the perioade weekly', async function() {
            const response = await jikanjs.loadMeta('anime', 'weekly');

            assert.isNotEmpty(response, 'response should not be empty');
        })
    })

    describe('#Status', function() {
        it('load status', async function() {
            const response = await jikanjs.loadStatus();

            assert.isNotEmpty(response, 'response should not be empty');
            assert.isDefined(response.cached_requests, 'cached_requests should be defined');
        })
    })

    describe('#Raw', function() {
        it('send a raw request', async function() {
            const response = await jikanjs.raw(['anime', 1]);

            assert.isNotEmpty(response, 'response should not be empty');
            assert.equal(response.mal_id, 1, 'wrong id, should be 1');
            assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
        })
    })


    describe('#Error Handling', function() {

        it('400 - Invalid extended request', async function() {
            var extension = 'titles';

            try {
                await jikanjs.loadAnime(21, extension);
    
            } catch (error) {
                assert.equal(error.message, `Invalid extended request: "${extension}"`);
                assert.equal(error.status, 400);
            }
        })    
        
        it('404 - No ID/Path Given', async function() {
            try {
                await jikanjs.loadAnime(0);
    
            } catch (error) {
                assert.equal(error.message, 'No ID/Path Given');
                assert.equal(error.status, 404);
            }
        })    

        it('404 - File does not exist', async function() {
            try {
                await jikanjs.loadAnime(2);
    
            } catch (error) {
                assert.equal(error.message, 'File does not exist');
                assert.equal(error.status, 404);
            }
        })    
    })
});