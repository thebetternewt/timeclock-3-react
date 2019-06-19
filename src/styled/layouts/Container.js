import styled from 'styled-components';

const Container = styled.section`
	display: flex;
	${({ direction }) => direction === 'column' && 'flex-direction: column;'}
	max-width: 100%;
	width: 960px;
`;

export default Container;
