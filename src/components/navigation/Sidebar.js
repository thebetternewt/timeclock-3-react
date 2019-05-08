import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { fixed } from '../../styled/utilities';
import { GRAY4 } from '../../styled/utilities';
import { FaRegChartBar, FaRegFileAlt, FaHistory } from 'react-icons/fa';
import { GRAY5 } from '../../styled/utilities/Colors';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : null;
};

const NavLink = props => <Link getProps={isActive} {...props} />;

const SidebarWrapper = ({ width }) => {
  return (
    <Sidebar width={width}>
      <ul>
        <li>
          <NavLink to="/">
            <FaRegChartBar />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <FaHistory />
            History
          </NavLink>
        </li>
        <li>
          <NavLink to="/timesheets">
            <FaRegFileAlt />
            Timesheets
          </NavLink>
        </li>
      </ul>
    </Sidebar>
  );
};

const Sidebar = styled.nav`
  ${fixed({ y: '60px' })}
  height: calc(100vh - 60px);
  width: ${({ width }) => `${width}px`};

  background-color: ${GRAY4};

  ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 30px 0 0;
  }

  li {
    display: block;
    width: 100%;
    height: 80px;

    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 40px;
      text-transform: uppercase;
      text-decoration: none;
      color: inherit;

      &.active {
        background-color: ${GRAY5};
      }

      svg {
        margin-right: 12px;
      }
    }
  }
`;

export default SidebarWrapper;
