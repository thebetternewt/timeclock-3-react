import { getMonth, getYear } from 'date-fns';

export const getFiscalYear = () => {
	const month = getMonth(new Date());
	let year = getYear(new Date());

	if (month > 5) {
		year++;
	}

	return year;
};
