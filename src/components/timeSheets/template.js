import { format } from 'date-fns';
import { WAGE_RATE, NIGHT_SHIFT_RATE } from './constants';

export default ({
	finalHours,
	employee,
	department,
	payPeriod,
	shifts,
	totalWagePay,
	totalNightPay,
	totalHours,
	totalNightShiftHours,
	totalPay,
	workStudy = false,
}) => {
	const adaptColsForWS = arr => {
		if (!workStudy) return arr;

		const mutatedArr = arr.reverse();
		mutatedArr[0] = '';
		return mutatedArr;
	};

	const shiftRows = shifts.map(shift => {
		let totalHrCols = [
			(shift.minutesElapsed / 60).toFixed(2),
			(shift.nightShiftMinutes / 60).toFixed(2),
		];

		return [
			format(shift.timeIn, 'MMM D, YYYY'),
			{
				stack: [
					`In: ${format(shift.timeIn, '    h:mm A')}`,
					`Out: ${format(shift.timeOut, ' h:mm A')}`,
				],
			},
			...adaptColsForWS(totalHrCols),
		];
	});

	return [
		{
			columns: [
				{ image: 'logo', width: 200 },
				{ width: '*', text: '' },
				{ text: 'For internal use only.', fontSize: 8 },
				{
					width: 'auto',
					fontSize: 8,
					alignment: 'right',
					table: {
						body: [
							[{ text: workStudy ? 'Work Study' : 'Wages', bold: true }],
							[finalHours.toFixed(2)],
						],
					},
				},
			],

			pageBreak: 'before',
			margin: [0, 0, 0, 20],
		},

		{
			fontSize: 10,
			margin: [0, 10],
			columns: [
				{
					stack: [
						{
							fontSize: 14,
							bold: true,
							margin: [0, 5, 0, 10],
							text: employee.name,
						},
						{
							text: `NetID: ${employee.netId}`,
							margin: [0, 0, 0, 2],
						},
						{
							text: `Student ID: ${employee.nineDigitId}`,
						},
					],
				},
				{
					width: '*',
					stack: [
						{ text: 'Department', bold: true, margin: [0, 9, 0, 10] },
						department.name,
					],
				},
				{
					width: 'auto',
					stack: [
						{
							text: `Pay Period: ${payPeriod.payPeriodId}`,
							bold: true,
							margin: [0, 9, 0, 10],
						},

						`Begin: ${format(payPeriod.startDate, 'MMM DD, YYYY')}`,
						`End: ${format(payPeriod.endDate, 'MMM DD, YYYY')}`,
					],
				},
			],
			columnGap: 15,
		},
		{
			layout: 'lightHorizontalLines',
			style: { fontSize: 10 },
			margin: [0, 5],
			table: {
				headerRows: 1,
				widths: [100, 100, '*', '*'],

				body: [
					[
						'Date',
						'Time',
						workStudy ? '' : 'Hours',
						workStudy ? 'Hours' : 'Night Shift Hours',
					],
					...shiftRows,
					[
						{ text: 'Total Hours', colSpan: 2 },
						{},
						...adaptColsForWS([
							totalHours.toFixed(2),
							totalNightShiftHours.toFixed(2),
						]),
					],

					[
						{ text: 'Rate', colSpan: 2 },
						{},
						...adaptColsForWS([
							`$${WAGE_RATE.toFixed(2)}/hr`,
							`$${NIGHT_SHIFT_RATE.toFixed(2)}/hr`,
						]),
					],
					[
						{ text: 'Pay', colSpan: 2 },
						{},
						...adaptColsForWS([
							`$${totalWagePay.toFixed(2)}`,
							`$${totalNightPay.toFixed(2)}`,
						]),
					],
					[
						{
							text: 'Total Pay:',
							colSpan: 3,
							fillColor: '#000',
							color: '#fff',
							margin: [0, 5],
							alignment: 'right',
							fontSize: 10,
						},
						{},
						{},
						{
							text: `$${totalPay.toFixed(2)}`,
							fillColor: '#000',
							color: '#fff',
							margin: [0, 5],
							fontSize: 10,
							alignment: 'left',
						},
					],
				],
			},
		},
		{
			text: 'Confirmation',
			bold: true,
			fontSize: 8,
		},
		{
			text:
				'I hereby certify that the information above is accurate and correct.',
			fontSize: 8,
		},

		{
			text:
				'________________________________________________________________________',
			margin: [0, 30, 0, 5],
			style: { alignment: 'right' },
		},
		{
			fontSize: 10,
			columns: [
				{ text: 'Student Signature', margin: [0, 5] },
				{ text: 'Date', margin: [0, 5] },
			],

			style: { alignment: 'right' },
		},
		{
			text:
				'________________________________________________________________________',
			margin: [0, 30, 0, 5],
			style: { alignment: 'right' },
		},
		{
			fontSize: 10,
			columns: [
				{ text: 'Supervisor Signature', margin: [0, 5] },
				{ text: 'Date', margin: [0, 5] },
			],

			style: { alignment: 'right' },
		},
	];
};
