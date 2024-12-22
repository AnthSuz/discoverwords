import { Player } from "../App";
import { Modal } from "./ui/modal";
import styled from "styled-components";

const RowTable = styled.div<{ $bgColor: string }>`
  display: flex;
  background-color: ${(props) => props.$bgColor};

  & p {
    width: 50%;
    padding: 8px;
  }
`;

interface RankGameModalType {
  closeRankGame: (name: string) => void;
  players: Player[];
}

export const RankGameModal = ({
  closeRankGame,
  players,
}: RankGameModalType) => {
  return (
    <Modal title="Classement" closeModal={() => closeRankGame("rankGameModal")}>
      {players
        .sort((a, b) => b.point - a.point)
        .map((player, index) => (
          <RowTable $bgColor={index % 2 === 0 ? "#CED1D4" : "white"}>
            <p>
              <b>{index + 1}</b> - <b>{player.name}</b>
            </p>
            <p>
              <b>{player.point}</b> points
            </p>
          </RowTable>
        ))}
    </Modal>
  );
};
