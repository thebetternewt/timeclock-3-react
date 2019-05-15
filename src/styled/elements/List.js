import styled from "styled-components";
import { LIGHT_GRAY, GRAY4 } from "../utilities";

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px 15px;
  border-bottom: 3px solid ${GRAY4};
  margin-bottom: 0.8rem;

  > div {
    flex-basis: 30%;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${LIGHT_GRAY};
  color: #000;

  margin: 5px 0;
  padding: 8px 15px;
  border-radius: 3px;

  > div {
    flex-basis: 30%;
  }

  button {
    float: right;
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    min-width: 80px;
  }
`;
