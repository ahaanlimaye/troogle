// npm dependencies
const express = require('express');
const bodyParser = require('body-parser');
const queue = require('express-queue');
const TrieFile = require('./trie');
const Trie = TrieFile.Trie;

const app = express(); // initializes Express app

// npm middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(queue({ activeLimit: 1, queueLimit: -1}));

const PORT = process.env.PORT || 3000; // port for app to run on

let trie = null; // trie variable

app.get('/', (req, res) => { // GET request to run when app is loaded
    res.send('Welcome to Troogle!');
})

app.post('/add', (req, res) => { // POST request to add word to the trie
    let word = req.body.word;
    res.send(trie.add(word));
})

app.delete('/delete', (req, res) => { // DELETE request to delete word from the trie
    let word = req.body.word;
    res.send(trie.delete(word));
})

app.get('/search', (req, res) => { // GET request to search for a word in the trie
    let word = req.query.word;
    res.send(trie.search(word));
})

app.get('/autocomplete', (req, res) => { // GET request to get autocomplete words from the trie
    let word = req.query.word;
    res.send(trie.autocomplete(word));
})

app.get('/display', (req, res) => { // GET request to display the trie in a string
    res.send(trie.display());
})

app.listen(port, () => { // starts app on designated port and creates empty trie
    trie = new Trie();
    console.log(`Troogle app has started running on port ${PORT}`);
})