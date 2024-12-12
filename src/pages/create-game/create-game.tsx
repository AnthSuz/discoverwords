import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import {
  Button,
  CheaterStyle,
  CourteousStyle,
  ImpostorStyle,
  LinkButton,
} from "../../utils/styled";
import { device } from "../../utils/device";
import { Player, PlayerContext } from "../../App";
import { BadgePlus, BadgeMinus, CirclePlus, CircleMinus } from "lucide-react";
import wordFile from "../../utils/courteous_impostor_combinations_corrected.json";

const CreateGameContainer = styled.div`
  display: grid;
  height: 100%;
`;

const CreateGameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const CountPlayer = styled.p`
  font-size: 64px;
  margin: 0;
`;

const ButtonIcon = styled.button`
  border: none;
  background: none;
  padding: 0;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 24px;
  gap: 16px;
  width: 60%;
  @media ${device.mobile} {
    width: 30%;
  }
`;

const LinePlayers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Footer = styled.footer`
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 16px;
`;

const sharedStylesBadge = css<{ $disabled?: boolean }>`
  height: 32px;
  width: 32px;
  stroke: ${(props) => (props.$disabled ? "#d9d9d9" : "black")};

  &:hover {
    cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
    stroke: ${(props) => (props.$disabled ? "#d9d9d9" : "#5c5c5c")};
  }
`;

const BadgeMinusIcon = styled(BadgeMinus)<{ $disabled?: boolean }>`
  ${sharedStylesBadge}
`;

const BadgePlusIcon = styled(BadgePlus)<{ $disabled?: boolean }>`
  ${sharedStylesBadge}
`;

const sharedStylesCircle = css`
  cursor: pointer;
`;

const CirclePlusIcon = styled(CirclePlus)`
  ${sharedStylesCircle}
`;

const CircleMinusIcon = styled(CircleMinus)`
  ${sharedStylesCircle}
`;

interface Players {
  courteous: number;
  impostor: number;
  cheater: number;
  impostorAndCheaterMax: number;
}

export const CreateGame = () => {
  const { setGame }: any = useContext(PlayerContext);

  const [countPlayer, setCountPlayer] = useState<number>(5);
  const [players, setPlayers] = useState<Players>({
    courteous: 3,
    impostor: 1,
    cheater: 1,
    impostorAndCheaterMax: 2,
  });

  const calculatePlayers = (count: number) => {
    const courteous = Math.floor((count + 2) / 2);
    const impostorAndCheaterMax = Math.floor((count - 1) / 2);

    let impostorPlayers = Math.round((70 * impostorAndCheaterMax) / 100);
    let cheaterPlayers = Math.round((30 * impostorAndCheaterMax) / 100);

    if (count === 11 || count === 12) {
      impostorPlayers = 3;
    }
    if (count === 17 || count === 18) {
      impostorPlayers = 5;
      cheaterPlayers = 3;
    }

    return {
      courteous,
      impostor: impostorPlayers,
      cheater: cheaterPlayers,
      impostorAndCheaterMax,
    };
  };

  const changePlayers = (
    type: "impostor" | "cheater",
    action: "add" | "remove",
    count: number
  ) => {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };

      if (count === 3) {
        if (prevPlayers.impostor === 1) {
          newPlayers.impostor--;
          newPlayers.cheater++;
        } else {
          newPlayers.impostor++;
          newPlayers.cheater--;
        }
      } else {
        const adjustment = action === "add" ? -1 : 1;
        newPlayers.courteous += adjustment;
        newPlayers[type] += action === "add" ? 1 : -1;
      }

      return newPlayers;
    });
  };

  const canAddPlayer = useCallback(
    (
      courteousPlayer: number,
      currentPlayer: number,
      maxPlayer: number,
      totalPlayer: number
    ): boolean => {
      if (countPlayer === 3 && currentPlayer === 0) return true;
      if (countPlayer % 2 !== 0 && totalPlayer === courteousPlayer - 1) {
        return false;
      } else return currentPlayer < maxPlayer && totalPlayer < courteousPlayer;
    },
    [countPlayer]
  );

  const canRemovePlayer = useCallback(
    (currentPlayer: number, otherPlayer: number): boolean => {
      return currentPlayer === 0 || (currentPlayer === 1 && otherPlayer === 0);
    },
    []
  );

  // ----- IMPOSTOR -----

  const showAddImpostorButton: boolean = useMemo(() => {
    return canAddPlayer(
      players.courteous,
      players.impostor,
      players.impostorAndCheaterMax,
      players.impostor + players.cheater
    );
  }, [players, canAddPlayer]);

  const showRemoveImpostorButton: boolean = useMemo(() => {
    return canRemovePlayer(players.impostor, players.cheater);
  }, [canRemovePlayer, players]);

  // ----- CHEATER -----

  const showAddCheaterButton: boolean = useMemo(() => {
    return canAddPlayer(
      players.courteous,
      players.cheater,
      players.impostorAndCheaterMax,
      players.impostor + players.cheater
    );
  }, [players, canAddPlayer]);

  const showRemoveCheaterButton: boolean = useMemo(() => {
    return canRemovePlayer(players.cheater, players.impostor);
  }, [canRemovePlayer, players]);

  // ----- -----

  const generatePlayers = useCallback((): Player[] => {
    const word: { courteous: string; impostor: string } =
      wordFile[Math.floor(Math.random() * 999)];

    const roles: string[] = [
      Array.from({ length: players.courteous }).map((_) => "courteous"),
      Array.from({ length: players.impostor }).map((_) => "impostor"),
      Array.from({ length: players.cheater }).map((_) => "cheater"),
    ].flat();

    const newPlayers: Player[] = Array.from({ length: countPlayer }).map(
      (a, b) => {
        return {
          id: b,
          role: roles[b],
          name: ``,
          eliminated: false,
          point: 0,
          assignedWord:
            roles[b] === "courteous"
              ? word.courteous
              : roles[b] === "impostor"
              ? word.impostor
              : "",
        };
      }
    );

    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return shuffle(newPlayers);
  }, [players, countPlayer]);

  useEffect(() => {
    if (countPlayer >= 3 && countPlayer <= 20) {
      setPlayers(calculatePlayers(countPlayer));
    }
  }, [countPlayer]);

  return (
    <CreateGameContainer>
      <CreateGameContent>
        <Counter>
          <ButtonIcon
            aria-label="less-button"
            onClick={(e) => {
              e.preventDefault();
              setCountPlayer(countPlayer - 1);
            }}
            disabled={countPlayer <= 3}
          >
            <BadgeMinusIcon $disabled={countPlayer <= 3} />
          </ButtonIcon>
          <CountPlayer aria-label="count-player">{countPlayer}</CountPlayer>
          <ButtonIcon
            aria-label="add-button"
            onClick={(e) => {
              e.preventDefault();
              setCountPlayer(countPlayer + 1);
            }}
            disabled={countPlayer >= 20}
          >
            <BadgePlusIcon $disabled={countPlayer >= 20} />
          </ButtonIcon>
        </Counter>

        <PlayersContainer>
          <LinePlayers>
            <CourteousStyle aria-label="courteous-player">
              {players.courteous} Courtois
            </CourteousStyle>
          </LinePlayers>

          <LinePlayers>
            {!showRemoveImpostorButton && (
              <ButtonIcon
                aria-label="less-impostor"
                onClick={() => changePlayers("impostor", "remove", countPlayer)}
              >
                <CircleMinusIcon />
              </ButtonIcon>
            )}
            <ImpostorStyle aria-label="impostor-player">
              {players.impostor} Imposteur
              {`${players.impostor > 1 ? "s" : ""}`}
            </ImpostorStyle>
            {showAddImpostorButton && (
              <ButtonIcon
                aria-label="more-impostor"
                onClick={() => changePlayers("impostor", "add", countPlayer)}
              >
                <CirclePlusIcon />
              </ButtonIcon>
            )}
          </LinePlayers>

          <LinePlayers>
            {!showRemoveCheaterButton && (
              <ButtonIcon
                onClick={() => changePlayers("cheater", "remove", countPlayer)}
              >
                <CircleMinusIcon />
              </ButtonIcon>
            )}
            <CheaterStyle aria-label="cheater-player">
              {players.cheater} Tricheur
              {`${players.cheater > 1 ? "s" : ""}`}
            </CheaterStyle>
            {showAddCheaterButton && (
              <ButtonIcon
                onClick={() => changePlayers("cheater", "add", countPlayer)}
              >
                <CirclePlusIcon />
              </ButtonIcon>
            )}
          </LinePlayers>
        </PlayersContainer>
      </CreateGameContent>
      <Footer>
        <LinkButton to="/game">
          <Button
            onClick={() => {
              setGame({
                players: generatePlayers(),
                numberPlayer: countPlayer,
              });
            }}
          >
            COMMENCER
          </Button>
        </LinkButton>
      </Footer>
    </CreateGameContainer>
  );
};
