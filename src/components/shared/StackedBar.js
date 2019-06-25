import React from 'react';
import styled from 'styled-components';

// Accepts an array of items: objects with a value and a label (string or component).
const StackedBar = ({ items = [], baseLabel: BaseLabel }) => (
	<Bar>
		{items.map(i => (
			<span
				key={i.label}
				className={i.value === 0 ? 'hide' : ''}
				style={{ width: `${i.value}%` }}
			>
				{i.label}
				<span className="tooltip-text">{i.label}</span>
			</span>
		))}
		<span>{typeof BaseLabel === 'string' ? BaseLabel : <BaseLabel />}</span>
	</Bar>
);

const Bar = styled.div`
	height: 24px;
	background: #ddd;
	display: flex;
	border-radius: 5px;
	align-items: center;

	/* FOR TOOLTIP */
	position: relative;

	& > span {
		display: flex;
		align-items: center;
		height: 100%;
		font-size: 0.7rem;
		padding: 0 8px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: default;
		transition: 1.5s all cubic-bezier(0.78, -0.06, 0, 0.97);

		&:first-of-type {
			border-radius: 5px 0 0 5px;
			background: #007bff;

			.tooltip-text {
				border-color: #007bff;
			}
		}
		&:nth-of-type(2) {
			background: #ffc107;

			.tooltip-text {
				border-color: #ffc107;
			}
		}
		&:nth-of-type(3) {
			background: #28a745;

			.tooltip-text {
				border-color: #28a745;
			}
		}
		&:last-of-type {
			color: #333;
			margin-left: auto;
			font-weight: 800;
		}

		&.hide {
			padding: 0;
		}

		.tooltip-text {
			visibility: hidden;
			/* width: 120px; */
			background-color: #eee;
			color: #111;
			text-align: center;
			border-radius: 6px;
			padding: 5px 8px;

			/* Position the tooltip */
			position: absolute;
			top: calc(100% + 3px);
			z-index: 1;
			border: 2px solid #eee;
		}

		&:hover .tooltip-text {
			visibility: visible;
		}
	}
`;

export default StackedBar;
