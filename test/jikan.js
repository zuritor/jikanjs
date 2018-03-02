//@ts-check
'use strict';

const assert                        = require('chai').assert;
const jikanjs                       = require('../lib/jikan');
const pkg                           = require('../package');


describe(`${pkg.name}/Client`, function() {

    this.timeout(5000);

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