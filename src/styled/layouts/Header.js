import React from 'react';
import styled from 'styled-components';

import { fixed, GRAY1 } from '../utilities';
import Logo from './Logo';

const HeaderWrapper = ({ children, logoWidth }) => {
	return (
		<Header>
			<Logo width={logoWidth} />
			<div className="header-content">{children}</div>
		</Header>
	);
};

const Header = styled.header`
	height: 60px;
	width: 100%;
	${fixed};
	padding: 0 5%;

	display: flex;
	align-items: center;

	background-color: ${GRAY1};

	z-index: 10;

	a {
		display: block;
		padding: 10px;
		margin: 5px 0;

		color: inherit;
		text-decoration: none;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
	}
`;

export default HeaderWrapper;
