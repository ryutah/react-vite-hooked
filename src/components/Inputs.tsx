import styled from "styled-components";

export const Submit = styled.input.attrs({ type: "submit" })`
  padding: 5px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  width: 80px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
    color: antiquewhite;
  }
`;
