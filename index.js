const jikan             = require('./lib/jikan');

module.exports = jikan;


jikan.search('anime', 'One Pice', 1, {type: 'tv', status: 'airing'}).then(function(data) {
    //console.log(data);
})