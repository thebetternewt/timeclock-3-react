import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Spinner from './Spinner';
import {
	SUCCESS,
	PRIMARY,
	GRAY1,
	DANGER,
	GRAY5,
	LIGHT_GRAY,
} from '../utilities';

const Button = ({ naked, text, loading, href, external, ...styles }) => {
	if (href) {
		if (external) {
			return (
				<a href={href} {...styles}>
					{text && typeof text === 'string' ? text : text()}
				</a>
			);
		}
		return (
			<Link to={href} {...styles}>
				{text && typeof text === 'string' ? text : text()}
			</Link>
		);
	}

	return (
		<button {...styles}>
			{loading ? (
				<Spinner size="1rem" />
			) : text && typeof text === 'string' ? (
				text
			) : (
				text()
			)}
		</button>
	);
};

export default styled(Button)`
  padding: 0.5em 8px;
  margin: 5px 0;
  height: 2.3rem;
  min-width: 90px;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
	color: ${GRAY1};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

  &:disabled {
    /* background: ${LIGHT_GRAY};
    color: ${GRAY5}; */
    cursor: not-allowed;
  }

  svg {
    margin-right: 5px;
  }

  ${({ color }) => {
		switch (color) {
			case 'primary':
				return `
          background: ${PRIMARY};
          color: #fff;
        `;
			case 'success':
				return `
          background: ${SUCCESS};
        `;
			case 'danger':
				return `
          background: ${DANGER};
          color: #fff;
        `;
			default: {
				return `background: #ddd;`;
			}
		}
	}};

               
${({ naked }) =>
	naked &&
	`
  background: transparent;
  color: inherit;
  display: inline;
  padding: 0;
  margin: 0 1rem;
  text-decoration: underline;
  `}
`;
