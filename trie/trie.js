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

        while (this.#isEmpty(ptr.children)) {
            let char = ptr.char;
            ptr = ptr.parent;
            delete ptr.children[char];
            if (ptr.char == null && ptr.parent == null) {
                break;
            }
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

    #isEmpty(obj) {
        return Object.keys(obj).length == 0;
    }
}

function main() {
    var trie = new Trie();
    trie.add("car");
    trie.add("dog");
    trie.add("cat");
    console.log(trie.search("car"));
    console.log(trie.search("dog"));
    console.log(trie.search("cat"));
    trie.delete("car");
    trie.delete("dog");
    trie.delete("cat");
    console.log(trie.search("car"));
    console.log(trie.search("dog"));
    console.log(trie.search("cat"));
    trie.add("cat");
    trie.add("cataract");
    trie.add("catfish");
    trie.add("catelon");
    trie.add("dog");
    trie.add("caden");
    console.log(trie.autocomplete("cat"));
}

main();