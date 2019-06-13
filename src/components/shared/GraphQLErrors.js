import React from 'react';
import styled from 'styled-components';

import Box from '../../styled/layouts/Box';
import { DANGER } from '../../styled/utilities';

const GraphQlErrors = error => {
	console.log('graphql errors:', error);

	let gqlErrors = [];
	let messages = [];

	if (error.error) {
		gqlErrors.push(...error.error.graphQLErrors);
	} else if (error.errors) {
		gqlErrors.push(...error.errors.graphQLErrors);
	}

	console.log('gqlErrors:', gqlErrors);

	gqlErrors.forEach(({ message, extensions }) => {
		if (message === 'Argument Validation Error') {
			extensions.exception.validationErrors.forEach(({ constraints }) => {
				messages = [...messages, ...Object.values(constraints)];
			});
		} else {
			messages.push(message);
		}
	});

	return (
		<ErrorWrapper>
			<ul>
				{messages.map(msg => (
					<li key={msg}>{msg}</li>
				))}
			</ul>
		</ErrorWrapper>
	);
};

const ErrorWrapper = styled(Box)`
	background-color: ${DANGER};
	padding: 1rem;
	margin-bottom: 1rem;

	ul {
		color: #fff;
		opacity: 1;
		padding: 0;
		margin: 0;
		list-style: none;
	}
`;

export default GraphQlErrors;
