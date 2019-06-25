import React from 'react';
import styled from 'styled-components';

// Accepts an array of items: objects with a value and a label (string or component).
const StackedBar = ({ items = [], baseLabel: Label }) => (
	<Bar>
		{items.map(i => (
			<span
				key={i.label}
				className={i.value === 0 ? 'hide' : ''}
				style={{ width: `${i.value}%` }}
			>
				{i.label}
			</span>
		))}
		<span>{typeof Label === 'string' ? Label : <Label />}</span>
	</Bar>
);

const Bar = styled.div`
	height: 16px;
	background: #ddd;
	display: flex;
	border-radius: 5px;

	& > span {
		display: block;
		height: 100%;
		font-size: 0.7rem;
		padding: 0 8px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: 1.5s all cubic-bezier(0.78, -0.06, 0, 0.97);

		&:first-of-type {
			border-radius: 5px 0 0 5px;
			background: #007bff;
		}
		&:nth-of-type(2) {
			background: #ffc107;
		}
		&:nth-of-type(3) {
			background: #28a745;
		}
		&:last-of-type {
			color: #333;
			margin-left: auto;
			font-weight: 800;
		}

		&.hide {
			padding: 0;
		}
	}
`;

export default StackedBar;
