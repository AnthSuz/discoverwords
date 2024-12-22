import styled from "styled-components";
import { Modal } from "./ui/modal";
import { Button } from "../utils/styled";

const TitleModal = styled.p`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const Card = styled.div<{ $position: "left" | "right" }>`
  width: 75px;
  height: 100px;
  background-color: ${(props) =>
    props.$position === "left" ? "#b62a8f" : "#325082"};
  border-radius: 8px;
  box-shadow: 1px 5px 0px 1px #000000;
  transform: rotate(
    ${(props) => (props.$position === "left" ? "-10deg" : "10deg")}
  );
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    color: white;
    font-weight: bold;
    font-size: 24px;
  }
`;

interface AlertTurnPlayerType {
  closeAlertTurnPlayer: (name: string) => void;
  nextPlayer: number;
}

export const AlertTurnPlayer = ({
  closeAlertTurnPlayer,
  nextPlayer,
}: AlertTurnPlayerType) => {
  return (
    <Modal type="alert" hideCloseButton>
      <TitleModal>Joueur {nextPlayer}</TitleModal>
      <p>
        <center>Choisis une carte</center>
      </p>
      <CardContainer>
        <Card $position="left">
          <p>?</p>
        </Card>
        <Card $position="right">
          <p>?</p>
        </Card>
      </CardContainer>
      <center>
        <Button onClick={() => closeAlertTurnPlayer("alertTurnPlayer")}>
          Ok
        </Button>
      </center>
    </Modal>
  );
};
