# Troogle
A CLI (Command Line Interface) available via npm that allows users to interact with a Global Trie Data Structure

## Troogle's Trie Server
The Trie data structure that Troogle uses is built on a node.js app that is hosted on [Heroku](https://heroku.com)\
The Troogle CLI interacts with the Trie Server using REST endpoints created using express.js on the node.js app\
Domain: https://troogletrie.herokuapp.com/

## REST Endpoints
POST:
- `https://troogletrie.herokuapp.com/add`
  - CURL request &#8594; `curl -d "word=<query>" -X POST https://troogletrie.herokuapp.com/add`

DELETE:
- `https://troogletrie.herokuapp.com/delete`
  - CURL request &#8594; `curl -d "word=<query>" -X DELETE https://troogletrie.herokuapp.com/delete`

GET:
- `https://troogletrie.herokuapp.com/search?word=<query>`
  - CURL request &#8594; `curl -X GET https://troogletrie.herokuapp.com/search?word=<query>`
- `https://troogletrie.herokuapp.com/autocomplete?word=<query>`
  - CURL request &#8594; `curl -X GET https://troogletrie.herokuapp.com/autocomplete?word=<query>`
- `https://troogletrie.herokuapp.com/display`
  - CURL request &#8594; `curl -X GET https://troogletrie.herokuapp.com/display`
