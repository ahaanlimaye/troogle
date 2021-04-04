#!/usr/bin/env node

// npm dependencies
const axios = require('axios');
require('yargs/yargs')(process.argv.slice(2))

    // add command
    .command('add [word]', 'Add a word to the trie', {}, (argv) => {
        axios.post(`https://troogletrie.herokuapp.com/add`, { word: argv.word.toLowerCase() }) // calls add (POST request)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    // delete command
    .command('delete [word]', 'Delete a word from the trie', {}, (argv) => {
        axios.delete(`https://troogletrie.herokuapp.com/delete`, { data: { word: argv.word.toLowerCase() } }) // calls delete (DELETE request)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    // search command
    .command('search [word]', 'Search for a word in the trie', {}, (argv) => {
        axios.get(`https://troogletrie.herokuapp.com/search?word=${argv.word.toLowerCase()}`) // calls search (GET request)
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
        axios.get(`https://troogletrie.herokuapp.com/autocomplete?word=${argv.word.toLowerCase()}`) // calls autocomplete (GET request)
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

    // recommends similar commands if no matching command is found
    .recommendCommands()

    // recomonds running help option when there is an error
    .showHelpOnFail(false, 'Specify --help or -h for available options')

    // configures help option (-h or --help)
    .help()
    .usage('Usage: \n  ' + 'troogle <command>')
    .scriptName('troogle')

    // configures -h and -v aliases for --help and --version
    .alias('version', 'v')
    .alias('help', 'h')

    .argv;

