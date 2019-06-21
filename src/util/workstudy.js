export const aggWorkStudy = ({ amountAllotted = 0, shifts = [] }) => {
	let totalMinutes = 0;
	let percentUsed = 0;

	const wsShifts = shifts.filter(shift => shift.workStudy);

	wsShifts.forEach(shift => {
		totalMinutes += shift.minutesElapsed;
	});

	const totalWorkStudyHoursUsed = totalMinutes / 60;
	const amountUsed = totalWorkStudyHoursUsed * 7.25;

	const hoursAvailable = amountAllotted / 7.25;

	if (hoursAvailable > 0) {
		percentUsed = (totalWorkStudyHoursUsed / hoursAvailable) * 100;
	}

	return {
		shifts: wsShifts,
		hoursAvailable,
		hoursUsed: totalWorkStudyHoursUsed,
		amountAllotted,
		amountUsed,
		percentUsed,
	};
};
