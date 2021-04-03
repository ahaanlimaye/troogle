# Troogle
A CLI (Command Line Interface) available via npm that allows users to interact with a Global Trie Data Structure

## Functions
- Add a word to the Trie
- Delete a word from the Trie
- Search for a word in the Trie
- Autocomplete a word/prefix using the Trie
- Display a visualization of the Trie in the Command Line


## Installation
Run this npm install in terminal
```
npm install @ahaanlimaye/troogle -g
```

## Usage
To use Troogle simply run the keyword `troogle` followed by a command in terminal
```
troogle <command>
```

## Commands
`troogle add [word]` &#8594; Add a word to the trie\
`troogle delete [word]` &#8594; Delete a word from the trie\
`troogle search [word]` &#8594; Search for a word in the trie\
`troogle autocomplete [word]` &#8594; Autocomplete a word/prefix\
`troogle display ` &#8594; Display the trie

## Options
`troogle -v`, `troogle --version` &#8594; Show version number [boolean]\
`troogle -h`, `troogle --help` &#8594; Show help [boolean]

## Examples
```
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle --version
1.0.0
```
```
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle --help   
Usage:
  troogle <command>

Commands:
  troogle add [word]           Add a word to the trie
  troogle delete [word]        Delete a word from the trie
  troogle search [word]        Search for a word in the trie
  troogle autocomplete [word]  Autocomplete a word/prefix
  troogle display              Display the trie

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  ```
```annotate
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle display
\-root

(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle add apple
Troogle successfully added apple to the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle add dog
Troogle successfully added dog to the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle add cat
Troogle successfully added cat to the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle add catalog
Troogle successfully added catalog to the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle add cater
Troogle successfully added cater to the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle display
\-root
  |-a
  | \-p
  |   \-p
  |     \-l
  |       \-e
  |-d
  | \-o
  |   \-g
  \-c
    \-a
      \-t
        |-a
        | \-l
        |   \-o
        |     \-g
        \-e
          \-r

(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle search cat
Troogle found cat in the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle search catfish
Troogle did not find catfish in the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle autocomplete cat
Troogle found the following words for autocomplete:
- catalog
- cater
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle delete apple
Troogle successfully deleted apple from the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle delete dog
Troogle successfully deleted dog from the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle delete catalog
Troogle successfully deleted catalog from the trie
(base) ahaanlimaye@Ahaans-MacBook-Pro ~ % troogle display
\-root
  \-c
    \-a
      \-t
        \-e
          \-r
```
