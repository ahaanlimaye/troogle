#!/usr/bin/env node

require('yargs/yargs')(process.argv.slice(2))
    .command('add [word]', 'Add word to trie', {}, (argv) => {
        console.log('Added word', argv.word || 'default', 'word')
    })
    .command('delete [word]', 'Add word to trie', {}, (argv) => {
        console.log('Deleted word', argv.word || 'default', 'word')
    })
    .command('search [word]', 'Add word to trie', {}, (argv) => {
        console.log('Searched word', argv.word || 'default', 'word')
    })
    .command('autocomplete [word]', 'Add word to trie', {}, (argv) => {
        console.log('Autocompleted word', argv.word || 'default', 'word')
    })
    .demandCommand(1, 'You need to use one command', 'You can only use one command')
    .help()
    .argv;

