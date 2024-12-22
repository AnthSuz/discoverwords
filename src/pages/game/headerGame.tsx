import { useContext, useMemo } from "react";
import styled from "styled-components";
import { PlayerContext, ContextType } from "../../App";
import { device } from "../../utils/device";

const HeaderGameContent = styled.div`
  max-height: 15%;
  min-height: 15%;
  display: flex;
  align-items: center;
  flex-direction: column;

  & p:first-of-type {
    font-weight: 500;
    font-size: 16px;
    @media ${device.mobile} {
      margin-bottom: 8px;
    }
  }

  & p {
    text-align: center;
  }

  & div {
    margin-top: 8px;
    background-color: grey;
    width: fit-content;
    padding: 8px;
    border-radius: 4px;
    @media ${device.mobile} {
      margin-top: 16px;
    }

    & p {
      color: white;
    }
  }
`;

interface HeaderGameType {
  stepGame: string;
  nextPlayer: number;
}

export const HeaderGame = ({ stepGame, nextPlayer }: HeaderGameType) => {
  const { game } = useContext(PlayerContext) as ContextType;

  const playersRemaining = useMemo((): {
    courteous: number;
    impostor: number;
    cheater: number;
  } => {
    return game.players.reduce(
      (acc, player) => {
        if (!player.eliminated) {
          if (player.role === "courteous") acc.courteous += 1;
          if (player.role === "impostor") acc.impostor += 1;
          if (player.role === "cheater") acc.cheater += 1;
        }
        return acc;
      },
      { courteous: 0, impostor: 0, cheater: 0 }
    );
  }, [game.players]);

  return (
    <HeaderGameContent>
      <p>
        {stepGame === "start" && `Joueur ${nextPlayer}`}
        {stepGame === "description" && `Description`}
        {stepGame === "elimination" && `Elimination !`}
        {stepGame === "amnesiac" && `Mode amnésique`}
      </p>
      <p>
        {stepGame === "start" && `Choisis une carte`}
        {stepGame === "description" &&
          `Décrivez votre mot secret dans l'ordre indiqué, en utilisante
                juste un mot ou une phrase.`}
        {stepGame === "elimination" &&
          `Disctuez qui éliminer puis votez tous en même temps en
                  pointant du doigt !`}
        {stepGame === "amnesiac" &&
          `Clique sur ta carte pour revoir ton mot secret`}
      </p>
      <div>
        <p>Infiltré(s) Restant(s)</p>
        <p>
          {playersRemaining.impostor}
          {playersRemaining.impostor > 1 ? " Imposteurs - " : " Imposteur - "}
          {playersRemaining.cheater}
          {playersRemaining.cheater > 1 ? " Tricheurs" : " Tricheur"}
        </p>
      </div>
    </HeaderGameContent>
  );
};
