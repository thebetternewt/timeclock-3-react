import React from 'react';

import TimeSheetForm from './TimeSheetForm';

const TimeSheets = ({ admin = false, departments }) => (
	<div>
		<h1 className="title">Time Sheets</h1>
		<TimeSheetForm admin={admin} departments={departments} />
	</div>
);

export default TimeSheets;
