import React from 'react';
import styled from 'styled-components';
import { FaRegClock } from 'react-icons/fa';
import { SUCCESS } from '../utilities';

const Logo = ({ className }) => {
	return (
		<div className={className}>
			<FaRegClock size={40} color={SUCCESS} className="icon" />
			Shift
		</div>
	);
};

export default styled(Logo)`
	display: flex;
	align-items: center;
	width: ${({ width }) => `calc(${width}px - 5%)`};
	font-size: 36px;
	font-weight: bold;

	.icon {
		margin-right: 10px;
	}
`;
