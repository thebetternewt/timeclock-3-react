import styled from 'styled-components';
import { getColor } from '../utilities';

const Tag = styled.div`
	width: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 3px 8px;
	border-radius: 3px;

	${({ color }) => getColor(color)}
`;

export default Tag;
