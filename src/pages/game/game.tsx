import { useContext, useEffect, useState } from "react";
import { ContextType, Player, PlayerContext } from "../../App";
import styled from "styled-components";
import { device } from "../../utils/device";
import { ReactComponent as Target } from "../../utils/icons/target.svg";
import { getRoles } from "../../utils/function";
import { HeaderGame } from "./headerGame";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;
  margin-top: 8px;
`;

const PlayersContainer = styled.div`
  max-height: 60%;
  min-height: 60%;
  padding: 16px 5%;
  padding-bottom: 0;
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 30%);
  overflow-y: auto;

  @media ${device.mobile} {
    grid-template-columns: repeat(6, 15%);
    padding-top: 16px;
  }
`;

const PlayerCard = styled.div<{ $bgColor?: string; $eliminated: boolean }>`
  font-weight: bold;
  height: 75px;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  background-color: rgba(${(props) => props.$bgColor}, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$eliminated ? "24px" : "32px")};
  box-shadow: 1px 5px 0px 1px
    ${(props) => (props.$eliminated ? "grey" : "black")};
  cursor: ${(props) => (props.$eliminated ? "default" : "pointer")};
  transition: transform 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$eliminated ? "185, 188, 189" : `rgba(${props.$bgColor}, 0.5)`};
  }

  & p {
    color: ${(props) => (props.$eliminated ? "black" : "white")};
    line-height: ${(props) => (props.$eliminated ? "2.5" : "0")};
  }

  @media ${device.mobile} {
    height: 100px;
  }
`;

const PlayerName = styled.p<{ $bgColor?: string }>`
  text-align: center;
  margin-top: 12px;
  background-color: rgba(${(props) => props.$bgColor}, 0.6);
  color: white;
  border-radius: 8px;
  padding: 4px;
`;

const TurnPlayer = styled.div<{ $visible: boolean }>`
  background-color: #dc143b;
  color: white;
  height: 24px;
  width: 24px;
  border-radius: 100%;
  position: absolute;
  top: -8px;
  right: -8px;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const EliminateTag = styled.div<{ $visible?: boolean }>`
  position: absolute;
  background-color: orange;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  padding: 4px 20px;
  top: -4px;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: fit-content;
  visibility: ${(props) => (props.$visible ? "initial" : "hidden")};
`;

export interface PlayerGame extends Player {
  color?: string;
}

export const Game = () => {
  const { game, setGame } = useContext(PlayerContext) as ContextType;

  const [nextPlayer, setNextPlayer] = useState<number>(0);
  const [stepGame, setStepGame] = useState<
    "start" | "description" | "elimination" | "amnesiac"
  >("start");

  const colorCode: string[] = [
    "59, 127, 167",
    "68, 175, 25",
    "13, 144, 168",
    "78, 167, 11",
    "9, 81, 188",
    "134, 172, 207",
    "8, 141, 197",
    "60, 125, 71",
    "15, 113, 100",
    "11, 166, 121",
  ];

  useEffect(() => {
    const copyPlayers = [...game.players].map((player) => ({
      ...player,
      color: colorCode[Math.floor(Math.random() * colorCode.length)],
    }));

    //FAKE DATA FOR TESTING
    // const copyPlayers: Player[] = [
    //   {
    //     assignedWord: "oignon",
    //     eliminated: false,
    //     id: 0,
    //     name: "Anthony",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "ail",
    //     eliminated: false,
    //     id: 1,
    //     name: "Jenny",
    //     role: "impostor",
    //     point: 10,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "",
    //     eliminated: false,
    //     id: 2,
    //     name: "Lara",
    //     role: "cheater",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: true,
    //     id: 3,
    //     name: "Funky",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: false,
    //     id: 4,
    //     name: "David",
    //     role: "courteous",
    //     point: 8,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "",
    //     eliminated: false,
    //     id: 2,
    //     name: "Lara",
    //     role: "cheater",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: true,
    //     id: 3,
    //     name: "Funky",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: false,
    //     id: 4,
    //     name: "David",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: false,
    //     id: 4,
    //     name: "David",
    //     role: "courteous",
    //     point: 8,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "",
    //     eliminated: false,
    //     id: 2,
    //     name: "Lara",
    //     role: "cheater",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: true,
    //     id: 3,
    //     name: "Funky",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    //   {
    //     assignedWord: "oignon",
    //     eliminated: false,
    //     id: 4,
    //     name: "David",
    //     role: "courteous",
    //     point: 0,
    //     color: colorCode[Math.floor(Math.random() * colorCode.length)],
    //   },
    // ];

    setGame((prevState) => ({
      ...prevState,
      players: copyPlayers,
    }));
  }, []);

  return (
    <>
      <GameContainer>
        <HeaderGame stepGame={stepGame} nextPlayer={nextPlayer} />
        <PlayersContainer>
          {game.players.map((player: PlayerGame, index: number) => (
            <div style={{ maxHeight: "fit-content", position: "relative" }}>
              <PlayerCard
                key={index}
                $bgColor={player.color}
                $eliminated={player.eliminated}
              >
                {player.eliminated ? (
                  <>
                    <Target fill="white" width="100%" height="100%" />
                    <p style={{ position: "absolute" }}>
                      {getRoles(player.role)} <br /> Eliminé
                    </p>
                  </>
                ) : (
                  <p>{player.name ? Array.from(player.name)[0] : "?"}</p>
                )}
              </PlayerCard>
              {player.name && (
                <PlayerName
                  $bgColor={player.eliminated ? "185, 188, 189" : player.color}
                >
                  {player.name}
                </PlayerName>
              )}
              <TurnPlayer
                $visible={stepGame === "description" && !player.eliminated}
              >
                {player.id + 1}
              </TurnPlayer>
              <EliminateTag
                $visible={stepGame === "elimination" && !player.eliminated}
              >
                Eliminer
              </EliminateTag>
            </div>
          ))}
        </PlayersContainer>
      </GameContainer>
    </>
  );
};
