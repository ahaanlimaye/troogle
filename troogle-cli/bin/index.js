#!/usr/bin/env node

const axios = require('axios');
require('yargs/yargs')(process.argv.slice(2))
    .command('add [word]', 'Add a word to the trie', {}, (argv) => {
        axios.post(`https://troogletrie.herokuapp.com/add`, { word: argv.word })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .command('delete [word]', 'Delete a word from the trie', {}, (argv) => {
        axios.delete(`https://troogletrie.herokuapp.com/delete`, { data: { word: argv.word } })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .command('search [word]', 'Search for a word in the trie', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/search?word=${argv.word}`)
            .then((res) => {
                if (res.data) {
                    console.log(`Troogle found ${argv.word} in the trie`);
                }
                else {
                    console.log(`Troogle did not find ${argv.word} in the trie`);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .command('autocomplete [word]', 'Autocomplete a word/prefix', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/autocomplete?word=${argv.word}`)
            .then((res) => {
                if (res.data.length > 0) {
                    console.log(`Troogle found the following words for autocomplete:`)
                    res.data.forEach(word => {
                        console.log(`- ${word}`);
                    })
                }
                else {
                    console.log(`Troogle did not find any words for autocomplete`);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .command('display', 'Display the trie', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/display`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .demandCommand(1, 'You need to use a command')
    .help()
    .usage('troogle <command>')
    .scriptName('troogle')
    .argv;

