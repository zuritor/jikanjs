//@ts-check
'use strict';

const assert                        = require('chai').assert;
const jikanjs                       = require('../lib/jikan');
const pkg                           = require('../package');


describe(`${pkg.name}/Client`, function() {

    describe('#Anime', function() {

        it('loaded anime should be Cowboy Bebop', function(done) {
            const response = jikanjs.loadAnime(1);

            response.then(function(response) {
                assert.equal(response.mal_id, 1, 'wrong id, should be 1');
                assert.equal(response.title, 'Cowboy Bebop', 'wrong title should be Cowboy Bebop');
                done();
            })
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
            })
        })
    })

    describe('#Manga', function() {
        it('loaded manga should be Berserk', function(done) {
            const response = jikanjs.loadManga(2);

            response.then(function(response) {
                assert.equal(response.mal_id, 2, 'wrong id, should be 2');
                assert.equal(response.title, 'Berserk', 'wrong title should be Berserk');
                done();
            })
        })
    })
});