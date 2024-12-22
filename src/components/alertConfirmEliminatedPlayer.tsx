import { useContext, useState } from "react";
import { ContextType, Player, PlayerContext } from "../App";
import { Modal } from "./ui/modal";
import styled from "styled-components";
import {
  Button,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  IconName,
  Name,
  TitleModal,
} from "../utils/styled";
import { getRoles } from "../utils/function";

const ConfirmEliminationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface AlertConfirmEliminatedPlayerType {
  closeAlertConfirmEliminatedPlayer: (name: string) => void;
  selectedPlayer: Player;
  getWinner: () => void;
}

export const AlertConfirmEliminatedPlayer = ({
  closeAlertConfirmEliminatedPlayer,
  selectedPlayer,
  getWinner,
}: AlertConfirmEliminatedPlayerType) => {
  const { game, setGame } = useContext(PlayerContext) as ContextType;

  const [step, setStep] = useState(0);

  const confirmEliminatedPlayer = () => {
    setStep(1);
    const copyPlayers = [...game.players];
    copyPlayers.find((player) => player.id === selectedPlayer.id)!.eliminated =
      true;

    setGame((prevState) => ({
      ...prevState,
      players: copyPlayers,
    }));
    getWinner();
  };

  return (
    <Modal
      type="alert"
      hideCloseButton
      closeModal={() =>
        closeAlertConfirmEliminatedPlayer("alertConfirmEliminatedPlayer")
      }
    >
      {step === 0 ? (
        <>
          <TitleModal>Eliminé {selectedPlayer.name} ?</TitleModal>
          <ButtonContainer>
            <CancelButton
              $color={selectedPlayer.color as string}
              onClick={() =>
                closeAlertConfirmEliminatedPlayer(
                  "alertConfirmEliminatedPlayer"
                )
              }
            >
              Annuler
            </CancelButton>
            <ConfirmButton
              onClick={confirmEliminatedPlayer}
              $color={selectedPlayer.color as string}
            >
              Eliminer
            </ConfirmButton>
          </ButtonContainer>
        </>
      ) : (
        <ConfirmEliminationContainer>
          <TitleModal>1 {getRoles(selectedPlayer.role)} en moins !</TitleModal>
          <IconName $color={selectedPlayer.color}>
            {Array.from(selectedPlayer.name)[0]}
          </IconName>
          <Name $color={selectedPlayer.color}>{selectedPlayer.name}</Name>
          <Button
            onClick={() =>
              closeAlertConfirmEliminatedPlayer("alertConfirmEliminatedPlayer")
            }
          >
            OK
          </Button>
        </ConfirmEliminationContainer>
      )}
    </Modal>
  );
};
