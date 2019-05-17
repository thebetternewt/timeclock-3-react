import React from 'react';
import styled from 'styled-components';
import { DateRangePicker } from '@blueprintjs/datetime';

import bpCore from '@blueprintjs/core/lib/css/blueprint.css';
import bpDateTime from '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

const DateTimePicker = () => {
  return (
    <Picker
      // value={[
      //   new Date(period.startDate),
      //   new Date(period.endDate),
      // ]}
      onChange={e => console.log(e)}
    />
  );
};

const Picker = styled(DateRangePicker)`
  ${bpCore}
  ${bpDateTime}
`;

export default DateTimePicker;
