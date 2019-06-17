import styled from 'styled-components';

export const Form = styled.form`
	/* display: flex;
  flex-direction: column; */
	width: 100%;
	max-width: 500px;

	label {
		display: flex;
		align-items: center;
		margin: 0.5em 0 0;
	}
`;

export const Input = styled.input`
	display: block;
	padding: 0.5em 8px;
	border: none;
	border-radius: 3px;
	font-size: 1rem;
	width: 100%;

	margin: 8px 0;

	&[type='checkbox'] {
		margin-right: 1rem;
		-webkit-appearance: checkbox;
	}
`;

export const FormControl = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	label {
		margin-top: 0;
		margin-right: 1rem;
		flex-shrink: 0;

		/* &:after {
			content: ' :';
		} */
	}

	select,
	input,
	button,
	.field-loader-wrapper {
		flex-basis: 60%;
		margin: 5px;
		height: 34px;
	}
`;

export const Select = styled.select`
	width: 100%;
	padding: 0.5em 8px;
	border: none;
	border-radius: 3px;
	font-size: 1rem;
	cursor: pointer;
	position: relative;

	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
	background-repeat: no-repeat;
	background-position: right 0.7em top 50%, 0 0;
	background-size: 0.65em auto, 100%;

	margin: 5px 0;
`;

export const SrOnlyLabel = styled.label`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;
