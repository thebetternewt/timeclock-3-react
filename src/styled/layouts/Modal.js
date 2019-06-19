import React from 'react';
import styled from 'styled-components';
import { FaRegTimesCircle } from 'react-icons/fa';

import { fixed, absolute, GRAY5 } from '../utilities';

const Modal = ({ title, children, close }) => {
	return (
		<Wrapper>
			<Content>
				<CloseButton onClick={close}>
					<FaRegTimesCircle size={30} />
				</CloseButton>
				<Title>{title}</Title>
				{children}
			</Content>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	${fixed()};
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h3`
	margin: 0 0 1em;
`;

const Content = styled.div`
	position: relative;
	max-height: 90%;
	width: 500px;
	max-width: 100%;
	background: ${GRAY5};

	padding: 1rem;
	border-radius: 3px;
	box-shadow: 3px 7px 12px rgba(0, 0, 0, 0.4);
`;

const CloseButton = styled.button`
	${absolute({ xProp: 'right', y: '1rem', x: '1rem' })};
	background: transparent;
	border: none;
	color: inherit;
	padding: 0;
	cursor: pointer;
`;

export default Modal;
