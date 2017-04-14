JSON.parse(JSON.stringify(deepCopy));

/**
 * Создать копию объекта.
 *
 * @param obj
 * @returns {*}
 */
function deepCopyObject(obj) {
	var result = [];

	if (obj instanceof Array) {
		result = obj.map(deepCopyObject);
	} else if (obj instanceof Object) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				result[key] = deepCopyObject(obj[key]);
			}
		}
	} else {
		return obj;
	}

	return result;
}
