#!/usr/bin/env node

const axios = require('axios');
require('yargs/yargs')(process.argv.slice(2))
    .demandCommand(1, 'You need to use a command')
    .command('add [word]', 'Add a word to the trie', {}, (argv) => {
        axios.post(`http://localhost:3000/add`, { word: argv.word })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .command('delete [word]', 'Delete a word from the trie', {}, (argv) => {
        axios.delete(`http://localhost:3000/delete`, { data: { word: argv.word } })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .command('search [word]', 'Search for a word in the trie', {}, (argv) => {
        axios.get(`http://localhost:3000/search?word=${argv.word}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .command('autocomplete [word]', 'Autocomplete a word/prefix', {}, (argv) => {
        axios.get(`http://localhost:3000/autocomplete?word=${argv.word}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .command('display', 'Display the trie', {}, (argv) => {
        axios.get(`http://localhost:3000/display`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .help()
    .usage('troogle <command>')
    .scriptName('troogle')
    .argv;

