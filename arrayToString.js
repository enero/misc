     /**
     * Gets a string separated by commas
     * @param {(string[]|number[])} arrOfStr
     * @param {Object} [transformMap]
     * @returns {string}
     */
    getStrWithCommas: function (arrOfStr, transformMap) {
        var delimiter = ',',
            doTransform = Ext.isObject(transformMap);

        return arrOfStr.reduce(function(prevValue, curValue, index) {
            if (doTransform) {
                if (index === 1 && transformMap[prevValue]) {
                    prevValue = transformMap[prevValue];
                }
                if (transformMap[curValue]) {
                    curValue = transformMap[curValue];
                }
            }

            return prevValue + delimiter + curValue;
        });
    }
