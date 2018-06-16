// demo: https://jsfiddle.net/enero2/ny4p96Ls/51/

var square = fillSquare(7);

printSquare(square);

function fillSquare(side) {
    var result = [],
        count = 0,
        start = 0,
        end = side - 1,
        hor, ver;

    for (ver = start; ver <= end; ver++) {
        result[ver] = [];
        for (hor = start; hor <= end; hor++) {
            result[ver][hor] = null;
        }
    }

    ver = 0; hor = 0;
    while (end - start >= 0) {
        ver = start;
        for (; ver <= end; ver++) {
            result[hor][ver] = ++count;
        }
        ver = end;

        for (hor = start + 1; hor <= end; hor++) {
            result[hor][ver] = ++count;
        }
        hor = end;

        for (ver = end - 1; ver >= start; ver--) {
            result[hor][ver] = ++count;
        }
        ver = start;

        for (hor = end - 1; hor >= start + 1; hor--) {
            result[hor][ver] = ++count;
        }
        hor = start + 1;

        start++;
        end--;
    }

    return result;
}

function printSquare(arr) {
    var table = document.querySelector('.table'),
        hor, ver,
        end = arr.length - 1,
        html = '';

    for (ver = 0; ver <= end; ver++) {
        html += '<div class="row">';
        for (hor = 0; hor <= end; hor++) {
            html += '<div class="col">' + arr[hor][ver] + '</div>';
        }
        html += '</div>';
    }

    table.innerHTML = html;
}