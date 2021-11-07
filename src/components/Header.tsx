import styled from "styled-components";

interface Props {
  text: string;
}

const Wrapper = styled.header`
  background-color: #282c34;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
  cursor: pointer;
`;

const HeaderText = styled.h2`
  margin: 0;
`;

const Header = (props: Props): JSX.Element => {
  return (
    <Wrapper>
      <HeaderText>{props.text}</HeaderText>
    </Wrapper>
  );
};

export default Header;
