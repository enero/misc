/**
	 * Создать дерево из массива объектов.
	 *
	 * @param list
	 * @param parentId
	 * @returns [{*}]
	 */ 
	function makeTreeFromList(list, parentId) {
		var elements = [], id, name;
		parentId = parentId || 0;

		for (var i in list) {
			if (list[i].parent_id == parentId) {
				id   = list[i].id;
				name = list[i].name;
				delete list[i];
				elements.push({
					id: id,
					name: name,
					children: makeTreeFromList(list, id)
				});
			}
		}

		return elements;
	}

	/**
	 * Создать список с отступами из дерева.
	 * 
	 * @param elements дерево, которое не имеет корня, а все элементы 1-го уровня - это массив.
	 * @returns []
	 */
	function makeListFromTree(elements) {
		var result = [];
		(function recur(elements, result, level) {
			for (var i = 0; i < elements.length; i++) {
				result.push({
					value: elements[i].id,
					label: Array(level).join('— ') + elements[i].name
				})
				if (elements[i].children.length) {
					recur(elements[i].children, result, level + 1);
				}
			}
		})(elements, result, 1);

		return result;
	}

	/**
	 * Фильровать дерево по объекту регулярного выражения.
	 * Возвращает найденные узлы вместе с родительскими и дочерними элементами.
	 * 
	 * @param elements дерево, которое не имеет корня, а все элементы 1-го уровня - это массив.
	 * @param regExp
	 * @returns {*}
	 */
	function filterTree(elements, regExp) {
		return elements.filter(function(item) {
			if (regExp.test(item.name)) {
				return true;
			}

			if (item.hasOwnProperty('children') && item.children.length) {
				item.children = filterTree(item.children, regExp);

				if (item.children.length) {
					return true;
				}
			}
		});
	}

	$('#expenseSelect').ready(function () {
		var expenseTree = makeTreeFromList(expenseOptions);

		// Переопределяет функцию фильтрации с учетом родительских и дочерних элементов
		$('#expenseSelect').data('combine').modules.search._requestFunction = function(term, extraParams, isExactMatch) {
			var pattern = $.combine.search.escapeRegex(term),
				regExp,
				filteredOptions,
				resultBranches;

			pattern = isExactMatch ? ("^" + pattern + "$") : pattern;
			regExp  = new RegExp(pattern, "i");

			resultBranches  = filterTree(deepCopyObject(expenseTree), regExp);
			filteredOptions = makeListFromTree(resultBranches);

			return $.Deferred().resolve(filteredOptions);
		};
	});

