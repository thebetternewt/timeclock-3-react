import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { WAGE_RATE, NIGHT_SHIFT_RATE } from './constants';
import template from './template';
import logo from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TimeSheet = ({
	employees,
	// employeeShifts,
	// employees = [],
	payPeriod,
	department,
	endPrinting,
}) => {
	// TODO: Box around keyed hours (top right)
	// TODO: Rearrange student, name, netID, etc.

	let totalMinutes,
		totalHours,
		totalNightShiftMinutes,
		totalNightShiftHours,
		totalWagePay,
		totalNightPay,
		totalPay,
		finalHours;

	const calculateTotals = ({ shifts }) => {
		totalMinutes = shifts.reduce((total, shift) => {
			total += shift.minutesElapsed;
			return total;
		}, 0);
		totalHours = totalMinutes / 60;
		console.log('totalHours:', totalHours);

		totalNightShiftMinutes = shifts.reduce((total, shift) => {
			total += shift.nightShiftMinutes;
			return total;
		}, 0);
		totalNightShiftHours = totalNightShiftMinutes / 60;

		totalWagePay = parseFloat((totalHours * WAGE_RATE).toFixed(2));
		totalNightPay = totalNightShiftHours * NIGHT_SHIFT_RATE;

		totalPay = totalWagePay + totalNightPay;
		finalHours = parseFloat(totalPay.toFixed(2)) / WAGE_RATE;
		console.log('finalHours:', finalHours);

		console.log(totalMinutes);
	};

	let content = [];

	content = employees.reduce((content, emp) => {
		calculateTotals({ shifts: emp.shifts });

		const employeeSheet = template({
			finalHours,
			employee: emp,
			department,
			payPeriod,
			shifts: emp.shifts,
			totalWagePay,
			totalNightPay,
			totalHours,
			totalNightShiftHours,
			totalPay,
		});
		return [...content, ...employeeSheet];
	}, []);

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
