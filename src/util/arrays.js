export const arraysEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) return false;
	for (var i = arr1.length; i--; ) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
};

export const sortUsers = (arr, param) =>
	arr.sort((a, b) => {
		if (a[param].toUpperCase() > b[param].toUpperCase()) {
			return 1;
		}

		if (a[param].toUpperCase() < b[param].toUpperCase()) {
			return -1;
		}

		return 0;
	});

export const sortDepartments = (arr, param) =>
	arr.sort((a, b) => {
		if (a[param].toUpperCase() > b[param].toUpperCase()) {
			return 1;
		}

		if (a[param].toUpperCase() < b[param].toUpperCase()) {
			return -1;
		}

		return 0;
	});
