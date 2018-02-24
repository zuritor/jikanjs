Jikanjs
=======

Jikanjs is a small Wrapper for the unofficial MAL API [jikan.me](https://github.com/jikan-me/jikan). For more information, please visit the [jikan.me documentation](https://jikan.me/docs).

## Installation

`npm install jikanjs`

## Usage

```javascript
const jikanjs  = require('jikanjs');
```

### Anime

```javascript
// Retrieve information of a anime with its id
jikanjs.loadAnime(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

Retrieve more Information from the endpoint like characters & staff, episodes or news. List of all posible request parameter are listet in the [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/anime)

```javascript
// Retrieve the list of all characters and staff
jikanjs.loadAnime(1, 'characters_staff').then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

For the episodes request parameter is it possible to retrieve the secound, third, ... side if there are more than 100 episodes are paginated. see [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/anime)

```javascript
// Retrieve 2nd page if there's any
jikanjs.loadAnime(1, 'episodes', 2).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

### Manga

```javascript
// Retrieve information of a manga with its id
jikanjs.loadManga(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

For a list of all possible request Parameter refer to the [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/manga)

### Person

```javascript
// Retrieve information of a person with its id
jikanjs.loadPerson(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

For a list of all possible request Parameter refer to the [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/person)

### Character

```javascript
// Also retrieve information of a character by its id
jikanjs.loadCharacter(1).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

For a list of all possible request Parameter refer to the [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/character)

### Search

```javascript
// Also execute a search
jikanjs.search(type, 'search query', page).then(function (response) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

* types: List of all possible types is viewable in the [jikan.me documentation](https://jikan.docs.apiary.io/#reference/0/search)
* page: page number of the result