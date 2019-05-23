import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { format } from 'date-fns';

import logo from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const NIGHT_SHIFT_WEIGHT = 1.14;
const NIGHT_SHIFT_RATE = 1.0;
const WAGE_RATE = 7.25;

const TimeSheet = ({ employee, payPeriod, department, shifts }) => {
  const totalMinutes = shifts.reduce((total, shift) => {
    total += shift.minutesElapsed;
    return total;
  }, 0);

  const totalNightShiftMinutes = shifts.reduce((total, shift) => {
    total += shift.nightShiftMinutes;
    return total;
  }, 0);

  const totalHours = totalMinutes / 60;
  const totalNightShiftHours = totalNightShiftMinutes / 60;
  const WeightedNightShiftHours = totalNightShiftHours * NIGHT_SHIFT_WEIGHT;

  const totalPay =
    totalHours * WAGE_RATE + WeightedNightShiftHours * NIGHT_SHIFT_RATE;

  const shiftRows = shifts.map(shift => [
    format(shift.timeIn, 'MMM D, YYYY'),
    {
      stack: [
        `In: ${format(shift.timeIn, '    h:mm A')}`,
        `Out: ${format(shift.timeOut, ' h:mm A')}`,
      ],
    },
    (shift.minutesElapsed / 60).toFixed(2),
    (shift.nightShiftMinutes / 60).toFixed(2),
  ]);

  console.log(totalMinutes);

  const docDefinition = {
    content: [
      {
        columns: [
          { image: 'logo', width: 200 },
          { text: 'Wages', bold: true, alignment: 'right' },
        ],
      },
      {
        fontSize: 10,
        margin: [0, 10],
        columns: [
          {
            width: 'auto',
            stack: [
              { text: 'Student Name', bold: true, margin: [0, 5] },
              `${employee.name}`,
            ],
          },
          {
            width: 'auto',
            stack: [
              { text: 'NetID', bold: true, margin: [0, 5] },
              employee.netId,
            ],
          },
          {
            width: '*',
            stack: [
              { text: '9-Digit ID', bold: true, margin: [0, 5] },
              employee.nineDigitId,
            ],
          },
          {
            width: '*',
            stack: [
              { text: 'Department', bold: true, margin: [0, 5] },
              department.name,
            ],
          },
          {
            width: 'auto',
            stack: [
              {
                text: `Pay Period: ${payPeriod.payPeriodId}`,
                bold: true,
                margin: [0, 5],
              },

              `Begin: ${format(payPeriod.startDate, 'MMM DD, YYYY')}`,
              `End: ${format(payPeriod.endDate, 'MMM DD, YYYY')}`,
            ],
          },
        ],
        // optional space between columns
        columnGap: 15,
      },
      {
        layout: 'lightHorizontalLines', // optional
        style: { fontSize: 10 },
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          // widths: [50, 50, 50, 50, 50, '*'],
          widths: [100, 100, '*', '*'],

          body: [
            ['Date', 'Time', 'Hours', 'Night Shift Hours'],
            ...shiftRows,
            [
              { text: 'Total Hours', colSpan: 2 },
              {},
              totalHours.toFixed(2),
              totalNightShiftHours.toFixed(2),
            ],
            [{ text: 'Weight', colSpan: 2 }, {}, '1.00', NIGHT_SHIFT_WEIGHT],
            [
              { text: 'Total Hours Keyed', colSpan: 2 },
              {},
              totalHours.toFixed(2),
              WeightedNightShiftHours.toFixed(2),
            ],
            [
              { text: 'Rate', colSpan: 2 },
              {},
              `$${WAGE_RATE.toFixed(2)}/hr`,
              '$1.00/hr',
            ],
            [
              { text: 'Pay', colSpan: 2 },
              {},
              `$${totalPay.toFixed(2)}`,
              `$${(WeightedNightShiftHours * NIGHT_SHIFT_RATE).toFixed(2)}`,
            ],
            [
              {
                text: 'Total Hours:',
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
                text: (totalHours + WeightedNightShiftHours).toFixed(2),
                fillColor: '#000',
                color: '#fff',
                margin: [0, 5],
                fontSize: 10,
                alignment: 'left',
              },
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
    ],

    images: {
      logo,
    },
  };

  // Open Timesheet PDF in new tab
  pdfMake.createPdf(docDefinition).open();

  return null;
};

export default TimeSheet;
