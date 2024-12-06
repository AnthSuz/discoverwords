import styled from "styled-components";
import { useState } from "react";
import { Button, LinkButton } from "../../utils/styled";
import { RulesModal } from "../../components/rulesModal";

const HomeContainer = styled.div`
  display: grid;
  height: 100%;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
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
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <HomeContainer>
        <HomeContent>
          <LinkButton to="create-game">
            <Button>PLAY</Button>
          </LinkButton>
        </HomeContent>
        <Footer>
          <TextButton onClick={() => setShowModal(true)}>Règles</TextButton>
          <p>-</p>
          <TextButton>Contact</TextButton>
          <p>-</p>
          <TextButton>Patch note</TextButton>
        </Footer>
      </HomeContainer>
      {showModal && <RulesModal closeModal={closeModal} />}
    </>
  );
};
