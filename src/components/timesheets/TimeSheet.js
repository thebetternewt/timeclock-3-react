import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { format } from 'date-fns';

import logo from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const NIGHT_SHIFT_RATE = 1.0;
const WAGE_RATE = 7.25;

const TimeSheet = ({ employee, payPeriod, department, shifts }) => {
  // TODO: Box around keyed hours (top right)
  // TODO: Fine print message about rounding
  // TODO: Rearrange student, name, netID, etc.

  const totalMinutes = shifts.reduce((total, shift) => {
    total += shift.minutesElapsed;
    return total;
  }, 0);
  const totalHours = totalMinutes / 60;
  console.log('totalHours:', totalHours);

  const totalNightShiftMinutes = shifts.reduce((total, shift) => {
    total += shift.nightShiftMinutes;
    return total;
  }, 0);
  const totalNightShiftHours = totalNightShiftMinutes / 60;

  const totalWagePay = parseFloat((totalHours * WAGE_RATE).toFixed(2));
  const totalNightPay = totalNightShiftHours * NIGHT_SHIFT_RATE;

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

  const totalPay = totalWagePay + totalNightPay;
  const finalHours = parseFloat(totalPay.toFixed(2)) / WAGE_RATE;
  console.log('finalHours:', finalHours);

  console.log(totalMinutes);

  const docDefinition = {
    content: [
      {
        columns: [
          { image: 'logo', width: 200 },
          { text: 'Wages', bold: true, alignment: 'right' },
        ],
      },
      { text: 'Total Hours Keyed', alignment: 'right', fontSize: 10 },
      {
        text: finalHours.toFixed(2),
        alignment: 'right',
        fontSize: 10,
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
        columnGap: 15,
      },
      {
        layout: 'lightHorizontalLines',
        style: { fontSize: 10 },
        table: {
          headerRows: 1,
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

            [
              { text: 'Rate', colSpan: 2 },
              {},
              `$${WAGE_RATE.toFixed(2)}/hr`,
              '$1.00/hr',
            ],
            [
              { text: 'Pay', colSpan: 2 },
              {},
              `$${totalWagePay.toFixed(2)}`,
              `$${totalNightPay.toFixed(2)}`,
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
