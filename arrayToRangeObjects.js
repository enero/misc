     /**
     * Converts an array of digits to array with range objects
     *
     * @example
     *      In: [11,1,2,3,6,8,0,7]
     *      Out: [{
     *          start: 0,
     *          end: 3
     *      },
     *      {
     *          start: 6,
     *          end: 8
     *      },
     *      {
     *          start: 11,
     *          end: 11
     *      }]
     *
     * @param {number[]} arr
     * @param {Object} [options]
     * @param {string} [options.startKey]
     * @param {string} [options.endKey]
     * @returns {Object[]}
     */
    convertArrDigitsToRanges: function(arr, options) {
        var startKey = (options && options.startKey) || 'start',
            endKey = (options && options.endKey) || 'end',
            result = [],
            i = 0, j, obj;

        while (i < arr.length) {
            obj = {};
            obj[startKey] = arr[i];
            obj[endKey] = arr[i];

            for (j = i + 1; j < arr.length; j++) {
                if (arr[j] - arr[j - 1] === 1) {
                    obj[endKey] = arr[j];
                } else {
                    break;
                }
            }

            result.push(obj);
            i = j;
        }

        return result;
    }
