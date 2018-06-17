// https://jsfiddle.net/enero2/adq35pg8/19/

var dict = [
        'арбуз',
        'мама',
        'мамонт',
        'стена',
        'алгебра',
        'стенка',
        'стезя',
        'арбалет',
        'алгоритм'
    ],
    tree = {},
    i, j, word, node;

for (i = 0; i < dict.length; i++) {
    word = dict[i];
    node = tree;
    for (j = 0; j < word.length; j++) {
        if (!node[word[j]]) {
            node[word[j]] = {};
        }

        node = node[word[j]];
    }
}

console.log(tree);