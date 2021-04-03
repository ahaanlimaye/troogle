const express = require('express');
const bodyParser = require('body-parser');
const TrieFile = require('./trie');
const Trie = TrieFile.Trie;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let trie = null;

app.get('/', (req, res) => {
    res.send('Welcome to Troogle!');
})

app.post('/add', (req, res) => {
    let word = req.body.word;
    res.send(trie.add(word));
})

app.delete('/delete', (req, res) => {
    let word = req.body.word;
    res.send(trie.delete(word));
})

app.get('/search', (req, res) => {
    let word = req.query.word;
    res.send(trie.search(word));
})

app.get('/autocomplete', (req, res) => {
    let word = req.query.word;
    res.send(trie.autocomplete(word));
})

app.get('/display', (req, res) => {
    res.send(trie.display());
})

app.listen(port, () => {
    trie = new Trie();
    console.log(`Troogle app has started running on port ${port}`);
})