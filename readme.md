[![Build Status](https://travis-ci.org/zuritor/jikanjs.svg?branch=master)](https://travis-ci.org/zuritor/jikanjs) [![Coverage Status](https://coveralls.io/repos/github/zuritor/jikanjs/badge.svg?branch=master)](https://coveralls.io/github/zuritor/jikanjs?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/zuritor/jikanjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zuritor/jikanjs?targetFile=package.json)
              

Jikanjs
=======

Jikanjs is a small Wrapper for the unofficial MAL API [jikan.me](https://github.com/jikan-me/jikan). For more information about the jikan.me, please visit the [jikan.me documentation](https://jikan.me/docs).

## Installation

`npm install jikanjs --save`

## wrapped jikan Features

* Anime Parsing
* Manga Parsing
* Character Parsing
* People Parsing
* Search
* Seasonal Anime
* Anime Schedule
* Top
* Meta

## Usage

```javascript
const jikanjs  = require('jikanjs');
```

### Anime Parsing

```javascript
// Retrieve anime Information from its id
jikanjs.loadAnime(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// also it is possible to receive extra Information like characters_staff, episodes, etc..
jikanjs.loadAnime(1, 'characters_staff').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// furthermore it is possible to get the secound, third, ... page of episodes if the anime has more than 100 episodes. 
jikanjs.loadAnime(1, 'episodes', 2).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/anime) for more Information.

### Manga Parsing

```javascript
// Retrieve Manga Information from its id
jikanjs.loadManga(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// for Manga's its also possible to receive extra Information like characters, news, etc..
jikanjs.loadManga(1, 'characters_staff').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/manga) for more Information.

### Character Parsing

```javascript
// Retrieve Character Information from its id
jikanjs.loadCharacter(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// Its also possible to request pictures of the Character
jikanjs.loadCharacter(1, 'pictures').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/character) for more Information.

### Person Parsing

```javascript
// Retrieve Person Information from its id
jikanjs.loadCharacter(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// Its also possible to request pictures of the Person
jikanjs.loadCharacter(1, 'pictures').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/person) for more Information.

### Search

**A Search query musst have a length of minimum 3 letters**

```javascript
// execute a simple search query with an search query and the page number which should given back
jikanjs.search(type, 'search query', 2).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// to execute a complexe search query with multiple parameter to filter the result 
// an object with the Advanced Search Parameters needs to be deliverd.
var params = {
    type: 'tv', // to receive only tv series
    status: 'airing' // to receive only currently airing animes
}
jikanjs.search(type, 'search query', 2, params).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

For all Possible Advanced Search Parameters visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/search).

### Seasonal Anime

```javascript
// Retrieve Information of a specific season by year and the season type
jikanjs.loadSeason(2012, 'winter').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/season) for more Information.

### Anime Schedule

```javascript
// Retrieve the current Schedule 
jikanjs.loadSchedule().then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// also it is possible to get the Schedule of a weekday 
jikanjs.loadSchedule('monday').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/schedule) for more Information.

### Top

```javascript
// Retrieve Top List of e.g. Anime, Manga
jikanjs.loadTop('anime').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// also its possible to specific define the page which should be returned
jikanjs.loadTop('anime', 2).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});

// furthermore the top list can be filtered
jikanjs.loadTop('anime', 2, 'tv').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

To see all possible subtypes which can be filtered visit [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/top).

### Meta

```javascript
// get Meta information
jikanjs.loadMeta(type, period)
// for loading the status
jikanjs.loadStatus()
```

This is for request Information related to the Jikan REST Instance. See [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/meta) for more Information and all possible parameter arguments.

## Raw

The raw function can be used as an alternative way to use the Jiken.me API or for new API routes which are not yet covered by the current Jikanjs wrapper version

```javascript
// Parameter which should be used for the request. 
// The function will build the following url 
var params = ['anime', 1];
jikanjs.raw(params).then(function (response) {
    // do stuff here https://api.jikan.moe/anime/1
}).catch(function (err) {
    // handle error
});
```