import { useEffect, useState } from "react";
import { Modal } from "./ui/modal";
import { Button, IconName } from "../utils/styled";
import styled from "styled-components";
import { PlayerGame } from "../pages/game/game";

interface RegisterPlayerModalType {
  player: PlayerGame;
  confirmRegisterModal: (name: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputName = styled.input`
  width: 60%;
  height: 32px;
  font-size: 16px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid;
`;

const Name = styled.p`
  color: black;
  background-color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0px 0px 15px 0px white;
  margin-bottom: 16px;
`;

const AssignedWord = styled.p`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  width: 30%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 16px;
  border: 1px solid black;
`;

export const RegisterPlayerModal = ({
  player,
  confirmRegisterModal,
}: RegisterPlayerModalType) => {
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (player && player.name) {
      setName(player.name);
      setStep(1);
    }
  }, [player]);
  return (
    <Modal hideCloseButton bgColor={player?.color} type="alert">
      <Container>
        {step === 0 ? (
          <>
            <IconName>{Array.from(name)[0]}</IconName>
            <InputName
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Choisir un nom"
            />
            <p
              style={{ marginBottom: "24px", color: "white", fontSize: "12px" }}
            >
              Saisis ton nom pour dévoiler ton mot secret
            </p>
            <Button onClick={() => setStep(1)} disabled={!name}>
              Découvre ton mot
            </Button>
          </>
        ) : (
          <>
            <IconName>{Array.from(name)[0]}</IconName>
            <Name>{name}</Name>
            <p style={{ color: "white" }}>
              {player?.role === "cheater"
                ? `Tu n'as pas de mot secret`
                : "Ton mot secret est"}
            </p>
            <AssignedWord>
              {player?.role === "cheater"
                ? "Tu es le tricheur"
                : player?.assignedWord}
            </AssignedWord>
            <Button
              onClick={() => {
                confirmRegisterModal(name);
                setName("");
                setStep(0);
              }}
            >
              Ok
            </Button>
          </>
        )}
      </Container>
    </Modal>
  );
};
