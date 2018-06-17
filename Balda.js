// demo: https://jsfiddle.net/enero2/adq35pg8/183/

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

function objMerge(obj1, obj2) {
    if (!isEmpty(obj2)) {
        for (var prop in obj2) {
            if (obj2.hasOwnProperty(prop)) {
                obj1[prop] = obj2[prop];
            }
        }
    }

    return obj1;
}

function findWords(area, dictTree) {
    var maxI = area.length,
        maxJ = area[0].length,
        letter,
        acc = {},
        words = {},
        recur;

    recur = function (acc, dictBranch, i, j) {
        if (isEmpty(dictBranch)) {
            curAcc = {};
            curAcc[acc.word] = '';

            return curAcc;
        }

        var letter,
            tmpAcc, curAcc,
            dictSubBranch,
            key = i + ':' + j,
            resultAccs;

        if (
            i >= 0 && i < maxI &&
            j >= 0 && j < maxJ &&
            acc[key] !== ''
        ) {
            letter = area[i][j];
            if (dictBranch[letter]) {

                curAcc = JSON.parse(JSON.stringify(acc));

                curAcc[key] = '';
                if (!curAcc['word']) {
                    curAcc['word'] = '';
                }
                curAcc['word'] += letter;

                resultAccs = {};
                dictSubBranch = dictBranch[letter];
                // up
                tmpAcc = recur(curAcc, dictSubBranch, i - 1, j);
                resultAccs = objMerge(resultAccs, tmpAcc);

                // right
                tmpAcc = recur(curAcc, dictSubBranch, i, j + 1);
                resultAccs = objMerge(resultAccs, tmpAcc);

                // down
                tmpAcc = recur(curAcc, dictSubBranch, i + 1, j);
                resultAccs = objMerge(resultAccs, tmpAcc);

                // left
                tmpAcc = recur(curAcc, dictSubBranch, i, j - 1);
                resultAccs = objMerge(resultAccs, tmpAcc);

                return resultAccs;
            }
        }

        return {};
    }

    for (i = 0; i < maxI; i++) {
        for (j = 0; j < maxJ; j++) {
            acc = recur({}, dictTree, i, j);

            if (!isEmpty(acc)) {
                words = objMerge(words, acc);
            }
        }
    }

    return Object.keys(words);
}

var dictList = [
        'арбуз', 'мама', 'мамонт', 'стена', 'алгебра', 'стенка', 'стезя', 'арбалет', 'алгоритм', 'ложечка', 'точка', 'ритм', 'картина', 'карта', 'радар', 'мир', 'рим', 'тир', 'мат', 'матрас'
    ],
    dictTree = {},
    i, j, word;

var area = [
        // 0    1    2    3    4    5    6
        [' ', ' ', 'а', ' ', ' ', ' ', ' '], // 0
        [' ', ' ', 'л', 'ж', ' ', ' ', ' '], // 1
        [' ', ' ', 'г', 'е', 'б', 'р', ' '], // 2
        [' ', 'т', 'о', 'ч', 'к', 'а', ' '], // 3
        ['а', 'с', 'р', 'а', 'а', 'д', ' '], // 4
        ['р', 'н', 'и', 'т', 'р', ' ', ' '], // 5
        ['т', 'а', 'м', 'м', ' ', ' ', ' '], // 6
        [' ', ' ', ' ', ' ', ' ', ' ', ' ']  // 7
    ],
    word,
    node;

//TODO что делать со словами, которые являются частью других слов
for (i = 0; i < dictList.length; i++) {
    word = dictList[i];
    node = dictTree;
    for (j = 0; j < word.length; j++) {
        if (!node[word[j]]) {
            node[word[j]] = {};
        }

        node = node[word[j]];
    }
}

console.log(dictTree);

console.log(findWords(area, dictTree));