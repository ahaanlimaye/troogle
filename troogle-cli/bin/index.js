#!/usr/bin/env node

// npm dependencies
const axios = require('axios');
require('yargs/yargs')(process.argv.slice(2))

    // add command
    .command('add [word]', 'Add a word to the trie', {}, (argv) => {
        axios.post(`https://troogletrie.herokuapp.com/add`, { word: argv.word }) // calls add (POST request)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    // delete command
    .command('delete [word]', 'Delete a word from the trie', {}, (argv) => {
        axios.delete(`https://troogletrie.herokuapp.com/delete`, { data: { word: argv.word } }) // calls delete (DELETE request)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    // search command
    .command('search [word]', 'Search for a word in the trie', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/search?word=${argv.word}`) // calls search (GET request)
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

    // autocomplete command
    .command('autocomplete [word]', 'Autocomplete a word/prefix', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/autocomplete?word=${argv.word}`) // calls autocomplete (GET request)
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

    // display command
    .command('display', 'Display the trie', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/display`) // calls display (GET request)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    // requires that a command be used
    .demandCommand(1, 'You need to use a command')

    // configures help option (-h or --help)
    .help()
    .usage('troogle <command>')
    .scriptName('troogle')
    
    .argv;

