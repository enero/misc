// Задача: обработать список запросов с ограничением одновременно выполняющихся.
// Demo: https://jsfiddle.net/enero2/Lz1hsoqa/133/

class RequestQueue {

    constructor(urls, concurrentCount) {
        this.URLS = urls;
        this.MAX_CONCURRENT_COUNT = concurrentCount;
        this.freeCount = concurrentCount;
        this.index = 0;
        this.timerId = null;

        this.result = {};

        this.indexEl = document.getElementById('index');
        this.freeEl = document.getElementById('free');
        this.resultEl = document.getElementById('result');
    }

    process() {
        this.timerId = setInterval(this.tryNext.bind(this), 4);
    }

    tryNext() {
        let url;

        if (this.freeCount > 0) {
            console.log('');
        }

        while (this.freeCount > 0) {
            if (this.isFinished()) {
                clearInterval(this.timerId);
                break;
            }

            url = this.URLS[this.index];

            console.log(`free: ${this.freeCount}`, `req #${this.index}: ${url}`);

            fetch(url)
                .then(response => response.json())
                .then(result => {
                        this.result[this.index] = result;
                        this.renderResult(JSON.stringify(result, null, 2));

                        if (this.freeCount < this.MAX_CONCURRENT_COUNT) {
                            this.freeCount++;
                            this.renderFree();
                        }
                    });

            this.index++;
            this.renderIndex();

            this.freeCount--;
            this.renderFree();
        }
    }

    isFinished() {
        return this.index > this.URLS.length - 1;
    }

    renderIndex() {
        this.indexEl.innerText = this.index;
    }

    renderFree() {
        this.freeEl.innerText = this.freeCount;
    }

    renderResult(text) {
        this.resultEl.value += text + ',\n';
    }
}

let urls = [];
let i = 1;
while (i <= 50) {
    urls.push('https://jsonplaceholder.typicode.com/posts/' + i);
    i++;
}

const queue = new RequestQueue(urls, 5);

queue.process();
