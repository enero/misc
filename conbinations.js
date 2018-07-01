// Создать массив объектов всех возможных комбинаций
// Demo: https://jsfiddle.net/enero2/dm2Lwa8p/101/

var combObj = {
    font: ['small', 'big'],
    color: ['blue', 'black'],
    weight: [300, 400],
    pressed: ['yes', 'no', 'don\'t know']
};

var numberElements;
var allCount = 1;
var key, i, j, k;
var curValues;
var newIndex = 0;
var allComb = [];
// Количество повторений всех групп
var subGroupItemCount;
// Количество групп
var groupCount;
// Количество повторяемых значений в группе
var repeatGroupItemCount;

// Узнать число комбинаций
for (key in combObj) {
    allCount = allCount * combObj[key].length;
}

// Сначала подгруппа охватывает все элементы, дальше на каждом новом уровне уменьшается, т.к. количество нужно рассчитывать относительно родительской группы.
subGroupItemCount = allCount;

for (key in combObj) {
    newIndex = 0;
    curValues = combObj[key];

    numberElements = curValues.length;
    groupCount = subGroupItemCount / numberElements;

    repeatAllCount = allCount / (numberElements * groupCount);
    for (k = 0; k < repeatAllCount; k++) {
        for (i = 0; i < numberElements; i++) { // каждое значение
            for (j = 0; j < groupCount; j++) { // повторяется groupCount раз
                if (allComb[newIndex] === undefined) {
                    allComb[newIndex] = {};
                }
                allComb[newIndex][key] = curValues[i];
                newIndex++;
            }
        }
    }
    subGroupItemCount = groupCount;
}

console.log(allComb);

var html = '';
for (i = 0; i < allComb.length; i++) {
    html += '<div class="row">';
    for (key in allComb[i]) {
        html += '<div>' + allComb[i][key] + '</div>';
    }
    html += '</div>';
}

document.getElementsByClassName('result')[0].innerHTML = html;