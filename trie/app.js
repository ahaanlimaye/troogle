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
    trie.add(word);
    res.send(`Troogle successfully added ${word} to the trie`)
})

app.delete('/delete', (req, res) => {
    let word = req.body.word;
    trie.delete(word);
    res.send(`Troogle successfully deleted ${word} from the trie`)
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