import styled from "styled-components";
import { useState } from "react";
import { Button, LinkButton } from "../../utils/styled";
import { RulesModal } from "../../components/rulesModal";
import { ContactModal } from "../../components/contactModal";

const HomeContainer = styled.div`
  display: grid;
  height: 100%;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: center;
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
  const [showModal, setShowModal] = useState<{
    rulesModal: boolean;
    contactModal: boolean;
  }>({
    rulesModal: false,
    contactModal: false,
  });

  const openModal = (modal: "rulesModal" | "contactModal") => {
    setShowModal((prev) => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: "rulesModal" | "contactModal") => {
    setShowModal((prev) => ({ ...prev, [modal]: false }));
  };

  return (
    <>
      <HomeContainer>
        <h1 style={{ textAlign: "center" }}>Discover Words</h1>
        <HomeContent>
          <LinkButton to="create-game">
            <Button>PLAY</Button>
          </LinkButton>
        </HomeContent>
        <Footer>
          <TextButton onClick={() => openModal("rulesModal")}>
            Règles
          </TextButton>
          <p>-</p>
          <TextButton onClick={() => openModal("contactModal")}>
            Contact
          </TextButton>
          <p>-</p>
          <TextButton>Patch note</TextButton>
        </Footer>
      </HomeContainer>
      {showModal.rulesModal && <RulesModal closeModal={closeModal} />}
      {showModal.contactModal && <ContactModal closeModal={closeModal} />}
    </>
  );
};
