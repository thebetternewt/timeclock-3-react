import React from 'react';
import { FaRegChartBar, FaRegFileAlt, FaHistory } from 'react-icons/fa';

import SideNavLink from './SideNavLink';

const EmployeeLinks = () => {
  return (
    <ul>
      <li>
        <SideNavLink to="/">
          <FaRegChartBar />
          Dashboard
        </SideNavLink>
      </li>
      <li>
        <SideNavLink to="/history">
          <FaHistory />
          History
        </SideNavLink>
      </li>
      <li>
        <SideNavLink to="/timesheets">
          <FaRegFileAlt />
          Timesheets
        </SideNavLink>
      </li>
    </ul>
  );
};

export default EmployeeLinks;
