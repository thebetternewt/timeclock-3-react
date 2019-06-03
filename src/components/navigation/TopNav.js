import React from 'react';
import styled from 'styled-components';
import TopNavLinks from './TopNavLinks';
import { absolute, SUCCESS } from '../../styled/utilities';

const TopNav = ({ user, className }) => {
	return (
		<nav className={className}>
			<TopNavLinks user={user} />
		</nav>
	);
};

export default styled(TopNav)`
	display: flex;
	align-items: center;

	a {
		display: block;
		width: 100px;
		text-align: center;
		margin-right: 10px;

		&.active {
			position: relative;

			&::after {
				${absolute({ yProp: 'bottom', y: '3px' })};
				display: block;
				background: ${SUCCESS};
				content: ' ';
				height: 3px;
				width: 100%;
			}
		}
	}
`;
