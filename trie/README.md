# Troogle
A CLI (Command Line Interface) available via npm that allows users to interact with a Global Trie Data Structure

## Troogle's Trie Server
The Trie data structure that Troogle uses is built on a node.js app that is hosted on [Heroku](https://heroku.com)\
The Troogle CLI interacts with the Trie Server using REST endpoints created using express.js on the node.js app\
Domain: https://troogletrie.herokuapp.com/

## REST Endpoints
POST:
```
curl -d "word=<query>" -X POST https://troogletrie.herokuapp.com/add
```

DELETE:
```
curl -d "word=<query>" -X DELETE https://troogletrie.herokuapp.com/delete
```

GET:
```
curl -X GET https://troogletrie.herokuapp.com/search?word=<query>
```
```
curl -X GET https://troogletrie.herokuapp.com/autocomplete?word=<query>
```
```
curl -X GET https://troogletrie.herokuapp.com/display
```

## How to Run Locally
1. Clone this Git Repository
```
git clone https://github.com/ahaanlimaye/troogle
```
2. CD into trie directory
```
cd trie
```
3. Install npm dependencies
```
npm install
```
4. Run app.js and open http://localhost:3000
```
node app.js
```

## Questions?
Contact me at ahaan.limaye@gmail.com
