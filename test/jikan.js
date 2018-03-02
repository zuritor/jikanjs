//@ts-check
'use strict';

const assert                        = require('chai').assert;
const jikanjs                       = require('../lib/jikan');
const pkg                           = require('../package');


describe(`${pkg.name}/Client`, function() {

    this.timeout(4000);

    describe('#Anime', function() {

        it('loaded anime', async function() {
            const response = await jikanjs.loadAnime(1);

            assert.equal(response.mal_id, 1, 'wrong id, should be 1');
            assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
        })

        it('episode request extension test',function(done) {
            const response = jikanjs.loadAnime(21, 'episodes', 2);
            
            response.then(function(response) {
                assert.equal(response.mal_id, 21, 'wrong id, should be 21');
                assert.equal(response.title, 'One Piece', 'wrong title should be One Piece');
                assert.isNotEmpty(response.episode, 'is not empty');
                assert.equal(response.episode.length, 100, 'less or more than 100 episodes, should be 100');
                assert.isAbove(response.episode_last_page, 7, 'not more than 7 pages, should be more');
                done();
            }).catch(function(error) {
                done(error);
            })
        })

        it('404 Not Found', function(done) {
            const response = jikanjs.loadAnime(0);

            response.then(function(response) {
                done(response);
            }).catch(function(error) {
                assert.equal(error.status, 404);
                done();
            })
        })
    })

    describe('#Manga', function() {
        it('loaded manga', function(done) {
            const response = jikanjs.loadManga(2);

            response.then(function(response) {
                assert.equal(response.mal_id, 2, 'wrong id, should be 2');
                assert.equal(response.title, 'Berserk', 'wrong title should be Berserk');
                done();
            }).catch(function(error) {
                done(error);
            })
        })
    })

    describe('#Person', function() {
        it('loaded person', function(done) {
            const response = jikanjs.loadPerson(8);

            response.then(function(response) {
                assert.equal(response.mal_id, 8, 'wrong id, should be 8');
                assert.equal(response.name, 'Rie Kugimiya', 'wrong name should be Rie Kugimiya');
                done();
            }).catch(function(error) {
                done(error);
            })
        })
    })

    describe('#Character', function() {
        it('loaded character', function(done) {
            const response = jikanjs.loadCharacter(43280);

            response.then(function(response) {
                assert.equal(response.mal_id, 43280, 'wrong id, should be 43280');
                assert.equal(response.name, 'Inori Yuzuriha', 'wrong name should be Inori Yuzuriha');
                done();
            }).catch(function(error) {
                done(error);
            })
        })
    })

    describe('#Search', function() {
        it('search Anime', function(done) {
            const response = jikanjs.search('anime', 'One Piece');

            response.then(function(response) {
                assert.isNotEmpty(response, 'response should not be empty');
                done();
            }).catch(function(error) {
                done(error);
            })
        })
    })
});