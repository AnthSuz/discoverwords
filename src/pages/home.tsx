import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  display: grid;
  height: 100%;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
`;

const LinkButton = styled(Link)`
  width: 100%;
  text-align: center;
  text-decoration: none;
`;

const Button = styled.button`
  width: 60%;
  padding: 12px;
  background-color: white;
  border: 1px solid #e8e9ea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 4px;
  color: #595959;

  &:hover {
    box-shadow: 0px 3px 8px 0px #e8e9ea;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 8px;
  padding-bottom: 16px;
`;

const TextButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Home = () => {
  return (
    <>
      <HomeContainer>
        <HomeContent>
          <LinkButton to="create-game">
            <Button>PLAY</Button>
          </LinkButton>
        </HomeContent>
        <Footer>
          <TextButton>Règles</TextButton>
          <p>-</p>
          <TextButton>Contact</TextButton>
          <p>-</p>
          <TextButton>Patch note</TextButton>
        </Footer>
      </HomeContainer>
    </>
  );
};
