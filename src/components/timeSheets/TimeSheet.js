import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { WAGE_RATE, NIGHT_SHIFT_RATE } from './constants';
import template from './template';
import logo from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TimeSheet = ({ employees, payPeriod, department, endPrinting }) => {
	const calculateTotals = ({ shifts }) => {
		const totalMinutes = shifts.reduce((total, shift) => {
			total += shift.minutesElapsed;
			return total;
		}, 0);

		const totalHours = totalMinutes / 60;

		const totalNightShiftMinutes = shifts.reduce((total, shift) => {
			total += shift.nightShiftMinutes;
			return total;
		}, 0);

		const totalNightShiftHours = totalNightShiftMinutes / 60;

		const totalWagePay = parseFloat((totalHours * WAGE_RATE).toFixed(2));
		const totalNightPay = totalNightShiftHours * NIGHT_SHIFT_RATE;

		const totalPay = totalWagePay + totalNightPay;
		const finalHours = parseFloat(totalPay.toFixed(2)) / WAGE_RATE;

		return {
			totalMinutes,
			totalHours,
			totalNightShiftMinutes,
			totalNightShiftHours,
			totalWagePay,
			totalNightPay,
			totalPay,
			finalHours,
		};
	};

	let content = [];

	employees.forEach(emp => {
		// Get wage shifts.
		let wageShifts = emp.shifts.filter(shift => !shift.workStudy);

		// Get work study shifts.
		let workStudyShifts = emp.shifts.filter(shift => shift.workStudy);

		if (workStudyShifts.length) {
			// Handle work study shifts if they exist.

			// Get work study night shifts and remove minutesElapsed.
			const workStudyNightShifts = workStudyShifts
				.filter(shift => shift.nightShiftMinutes > 0)
				.map(shift => ({ ...shift, minutesElapsed: 0 }));

			// Update all work study shifts to have no nightShiftMinutes.
			workStudyShifts = workStudyShifts.map(shift => ({
				...shift,
				nightShiftMinutes: 0,
			}));

			// Calculate work study totals
			const wsTotals = calculateTotals({ shifts: workStudyShifts });

			// Create work study time sheet
			const wsSheet = template({
				employee: emp,
				shifts: workStudyShifts,
				department,
				payPeriod,
				workStudy: true,
				...wsTotals,
			});

			// Append work study sheet to time sheet document content.
			content.push(wsSheet);

			// Append work study night shifts to wageShifts without minutesElapsed.
			wageShifts.push(...workStudyNightShifts);

			// Sort wages array by timeIn (ascending).
			wageShifts = wageShifts.sort((a, b) => {
				if (a.timeIn > b.timeIn) {
					return 1;
				}

				if (a.timeIn < b.timeIn) {
					return -1;
				}

				return 0;
			});
		}

		// Calculate wage totals
		const wageTotals = calculateTotals({ shifts: wageShifts });

		// Create wages time sheet
		const wagesSheet = template({
			employee: emp,
			shifts: wageShifts,
			department,
			payPeriod,
			...wageTotals,
		});

		// Append wage sheet to time sheet document content.
		content.push(wagesSheet);
	});

	const docDefinition = {
		content,
		images: {
			logo,
		},
	};

	// Open Timesheet PDF in new tab
	pdfMake.createPdf(docDefinition).open();

	endPrinting();
	return null;
};

export default TimeSheet;
