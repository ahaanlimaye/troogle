class Node {
    constructor(char, parent) {
        this.char = char;
        this.parent = parent;
        this.children = {};
        this.isWord = false;
    }
}

class Trie {

    constructor() {
        this.root = new Node(null, null);
        this.str = '';
    }

    add(keyword) {
        let ptr = this.root;

        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];

            if (!(char in ptr.children)) {
                ptr.children[char] = new Node(char, ptr);
            }
            ptr = ptr.children[char];
        }

        ptr.isWord = true;
    }

    delete(keyword) {
        let ptr = this.root;

        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];

            if (!(char in ptr.children)) {
                break;
            }
            ptr = ptr.children[char];
        }

        ptr.isWord = false;

        while (ptr !== this.root && this.#isEmpty(ptr.children)) {
            let char = ptr.char;
            ptr = ptr.parent;
            delete ptr.children[char];
        }
    }

    search(keyword) {
        let ptr = this.root;

        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];
            if (!(char in ptr.children)) {
                return false;
            }
            ptr = ptr.children[char];
        }

        return ptr.isWord;
    }

    autocomplete(keyword) {
        let ptr = this.root;

        for (let i = 0; i < keyword.length; i++) {
            let char = keyword[i];
            if (!(char in ptr.children)) {
                return [];
            }
            ptr = ptr.children[char];
        }

        let words = [];
        for (let char in ptr.children) {
            this.#autocompleteHelper(ptr.children[char], keyword, words);
        }

        return words;
    }

    #autocompleteHelper(ptr, keyword, words) {
        if (ptr.isWord) {
            words.push(keyword + ptr.char);
        }
        if (!(this.#isEmpty(ptr.children))) {
            for (let char in ptr.children) {
                this.#autocompleteHelper(ptr.children[char], keyword + ptr.char, words);
            }
        }
    }

    display() {
        let ptr = this.root;
        this.str = '';
        this.#displayHelper(ptr, '', true);
        return this.str;
    }

    #displayHelper(ptr, space, lastNode) {
        if (lastNode) {
            this.str += space + '\\-';
            space += '  ';
        }
        else {
            this.str += space + '|-';
            space += '| ';
        }

        if (ptr.char == null) {
            this.str += 'root\n';
        }
        else {
            this.str += ptr.char + '\n';
        }
        
        let keys = Object.keys(ptr.children);
        for (let i = 0; i < keys.length; i++) {
            this.#displayHelper(ptr.children[keys[i]], space, i === keys.length - 1);
        }
    }

    #isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}

module.exports = {
    Trie: Trie
}