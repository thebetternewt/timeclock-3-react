import React from 'react';
import {
  FaRegChartBar,
  FaRegFileAlt,
  FaHistory,
  FaUsers,
  FaRegBuilding,
} from 'react-icons/fa';

import NavLink from './SideNavLink';

const AdminLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to="/admin">
          <FaRegChartBar />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/employees">
          <FaUsers />
          Employees
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/departments">
          <FaRegBuilding />
          Departments
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/history">
          <FaHistory />
          History
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/timesheets">
          <FaRegFileAlt />
          Timesheets
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminLinks;
