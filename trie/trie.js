// Node Class to be used for each node in the trie
class Node {
    constructor(char, parent) {
        this.char = char; // character
        this.parent = parent; // parent Node
        this.children = {}; // map for children Nodes (JS objects use hashing)
        this.isWord = false; // boolean for ending character of a word
    }
}

// Trie class used by Troogle Client
class Trie {
    constructor() {
        this.root = new Node('root', null); // root Node
        this.str = ''; // string representation of trie
    }

    add(keyword) { // takes in keyword parameter and adds it to trie

        // traverses/build node path of keyword
        let ptr = this.root;
        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];

            if (!(char in ptr.children)) {
                ptr.children[char] = new Node(char, ptr);
            }
            ptr = ptr.children[char];
        }

        // sets last character of keyword to true and returns message
        if (ptr.isWord) {
            return `Troogle has already added ${keyword} to the trie`; // returns if keyword already exists
        }
        ptr.isWord = true;
        return `Troogle successfully added ${keyword} to the trie`; // returns if keyword doesn't already exist and is successfully added
    }

    delete(keyword) { // takes in keyword parameter and deletes it from trie

        // traverses to find last character node of keyword
        let ptr = this.root;
        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];

            if (!(char in ptr.children)) {
                return `Troogle can't find ${keyword} in the trie`; // returns if keyword doesn't exist
            }
            ptr = ptr.children[char];
        }
       
        // sets isWord of last character node to false and removes any leaf nodes that are not words from the trie
        if (!ptr.isWord) {
            return `Troogle can't find ${keyword} in the trie`; // returns if keyword doesn't exist
        }
        ptr.isWord = false;
        while (ptr !== this.root && !ptr.isWord && this.#isEmpty(ptr.children)) { // traverses back up the trie to delete leaf nodes that aren't words 
            let char = ptr.char;
            ptr = ptr.parent;
            delete ptr.children[char];
        }
        return `Troogle successfully deleted ${keyword} from the trie`; // returns if keyword exists and is successfully deleted
    }

    search(keyword) { // takes in keyword parameter and returns if it is in the trie (true/false)

        // traverses to find last character node of keyword
        let ptr = this.root;
        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];
            if (!(char in ptr.children)) {
                return false; // returns if not all characters of keyword are in the trie path
            }
            ptr = ptr.children[char];
        }
        return ptr.isWord; // returns if the last character represents the end of a word
    }

    autocomplete(keyword) { // takes in keyword parameter and returns autocomplete words for it (not including the keyword)
        
        // traverses to find last character node of keyword
        let ptr = this.root;
        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];
            if (!(char in ptr.children)) {
                return []; // returns no autocomplete words when keyword not in the trie
            }
            ptr = ptr.children[char];
        }

        // recursively traverses through each child node of the last character node and adds words to an array
        let words = []; // array of autocomplete words
        for (let char in ptr.children) {
            this.#autocompleteHelper(ptr.children[char], keyword, words); // recursive helper function
        }
        return words; // returns array of autocomplete words
    }

    #autocompleteHelper(ptr, keyword, words) {

        // adds word to array if it is a word
        if (ptr.isWord) {
            words.push(keyword + ptr.char);
        }

        // recursively traverses children if the node has child nodes
        if (!(this.#isEmpty(ptr.children))) {
            for (let char in ptr.children) {
                this.#autocompleteHelper(ptr.children[char], keyword + ptr.char, words);
            }
        }
    }

    display() {

        // recursively traverses and adds nodes to string visualization of the trie
        let ptr = this.root;
        this.str = '';
        this.#displayHelper(ptr, '', true); // recursive helper function
        return this.str;
    }

    #displayHelper(ptr, space, lastNode) {

        // backslash is displayed if character node is the last node of a character map
        if (lastNode) {
            this.str += space + '\\-';
            space += '  ';
        }
        // vertical line is displayed if character node is the last node of a character map
        else {
            this.str += space + '|-';
            space += '| ';
        }

        this.str += ptr.char + '\n'; // character of node is inserted into its spot

        // function is recursively called for all children of the node
        let keys = Object.keys(ptr.children);
        for (let i = 0; i < keys.length; i++) {
            this.#displayHelper(ptr.children[keys[i]], space, i === keys.length - 1);
        }
    }

    #isEmpty(obj) { // takes in object and returns if it is empty (true/false)
        return Object.keys(obj).length === 0;
    }
}

// exports Trie Class to be used by app.js
module.exports = {
    Trie: Trie
}