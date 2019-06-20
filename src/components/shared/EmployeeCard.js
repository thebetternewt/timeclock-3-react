import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../styled/elements/Button';
import { Circle } from 'rc-progress';
import { PRIMARY } from '../../styled/utilities';
import { animated } from 'react-spring';
import { FaRegStar, FaStar } from 'react-icons/fa';

const EmployeeCard = ({
	employee,
	supervisor = false,
	action,
	actionText,
	actionColor = 'danger',
	loading,
	workStudy,
	workStudyUsed,
	toggleSupervisor,
}) => {
	return (
		<Card isSuper={supervisor}>
			<div className="isSuper" onClick={toggleSupervisor}>
				<button>{supervisor ? <FaStar /> : <FaRegStar />}</button>
				<div className="tag">Supervisor</div>
			</div>
			<div className="card-content">
				<div className="progress">
					{/* <Circle percent="10" strokeWidth="4" strokeColor="#D3D3D3" /> */}
					<AnimatedCircle
						percent={workStudyUsed}
						gapDegree={70}
						gapPosition="left"
						strokeWidth="4"
						strokeLinecap="round"
						strokeColor={PRIMARY}
					/>
				</div>
				<div className="text">
					<h4 className="card-title">
						{employee.lastName}, {employee.firstName}
					</h4>
					<p className="detail">{employee.netId}</p>
					<p className="detail">
						Student ID: {employee.nineDigitId.slice(0, 3)}-
						{employee.nineDigitId.slice(3, 6)}-
						{employee.nineDigitId.slice(6, 9)}
					</p>
					<p className="ws-percent">{workStudy ? `${workStudyUsed}%` : ''}</p>
				</div>
				{/* <p> Work Study Used: ${workStudyUsed}</p> */}
			</div>
			<div className="card-footer">
				<Button
					href={`/employees/${employee.id}`}
					color="primary"
					text="Details"
				/>
				{action && (
					<Button
						color={actionColor}
						text={actionText}
						loading={loading}
						onClick={async () => {
							try {
								await action();
							} catch (err) {
								console.log(err);
							}
						}}
					/>
				)}
			</div>
		</Card>
	);
};

const Card = styled.div`
	background-color: #eee;
	color: #111;
	border-radius: 3px;
	box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.4);
	padding: 1rem 12px 1rem;
	min-height: 300px;
	transition: 200ms all ease;
	display: flex;
	flex-direction: column;
	position: relative;

	h4 {
		margin: 0 0 0.2em;
	}

	.isSuper {
		top: 0.5rem;
		left: 0.5rem;
		position: absolute;

		button {
			font-size: 2rem;
			border: none;
			background: transparent;
			color: ${({ isSuper }) => (isSuper ? 'goldenrod' : 'lightgrey')};
			cursor: pointer;
		}

		.tag {
			position: absolute;
			top: 0;
			left: 90%;
			font-size: 0.5rem;
			color: #333;
			text-transform: uppercase;
			display: ${({ isSuper }) => (isSuper ? 'block' : 'none')};
		}
	}

	.detail {
		margin: 0;
		font-size: 0.8rem;
	}

	.card-title {
		margin: 0;
	}

	.card-content {
		flex-grow: 1;
		position: relative;
		margin-top: 1rem;
		min-height: 200px;

		.progress {
			position: absolute;
			top: 0;
			left: 50%;
			width: 100%;
			height: 300px;

			z-index: 1;
			transform: translate3d(-50%, 0, 0);

			svg {
				transition: 200ms all ease;
			}
		}

		.text {
			margin: 4rem 1rem 0;
			position: relative;
			z-index: 2;
		}

		.ws-percent {
			display: block;
			margin: 1.5rem auto;
			font-size: 1.7rem;
			font-weight: bold;
			text-align: center;
		}
	}

	p {
		margin: 0.3em 0;
		font-size: 0.8rem;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 2rem 0 0;
		padding-top: 5px;
		border-top: 1px solid #ddd;
		flex-grow: 0;
		z-index: 2;

		a,
		button {
			font-size: 0.9em;
			padding: 5px;
			height: auto;
			width: auto;

			&:not(:last-child) {
				margin-right: 5px;
			}
		}
	}
`;

export default EmployeeCard;

const AnimatedCircle = animated(Circle);
