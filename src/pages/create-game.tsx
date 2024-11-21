import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Button,
  CheaterStyle,
  CourteousStyle,
  ImpostorStyle,
} from "../utils/styled";
import { MoreBigIcon, MoreIcon, LessBigIcon, LessIcon } from "../utils/icons";
import { device } from "../utils/device";

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

const More = styled.div<{ $disabled?: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${MoreIcon.standard});
  @media (hover: hover) {
    &:hover {
      background-image: url(${MoreIcon.hover});
    }
  }
`;

const Less = styled(More)`
  background-image: url(${LessIcon.standard});
  @media (hover: hover) {
    &:hover {
      background-image: url(${LessIcon.hover});
    }
  }
`;

const BigMore = styled(More)`
  width: 32px;
  height: 32px;
  background-image: url(${(props) =>
    props.$disabled ? MoreBigIcon.disabled : MoreBigIcon.standard});
`;

const BigLess = styled(Less)`
  width: 32px;
  height: 32px;
  background-image: url(${(props) =>
    props.$disabled ? LessBigIcon.disabled : LessBigIcon.standard});
`;

interface Players {
  courteous: number;
  impostor: {
    min: number;
    max: number;
    players: number;
  };
  cheater: {
    min: number;
    max: number;
    players: number;
  };
}

export const CreateGame = () => {
  const [countPlayer, setCountPlayer] = useState<number>(5);
  const [players, setPlayers] = useState<Players>({
    courteous: 3,
    impostor: {
      min: 0,
      max: 2,
      players: 1,
    },
    cheater: {
      min: 0,
      max: 2,
      players: 1,
    },
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
      impostor: {
        min: 0,
        max: impostorAndCheaterMax,
        players: impostorPlayers,
      },
      cheater: {
        min: 0,
        max: impostorAndCheaterMax,
        players: cheaterPlayers,
      },
    };
  };

  const changePlayers = (
    type: "impostor" | "cheater",
    action: "add" | "remove",
    count: number
  ) => {
    const copyPlayer = { ...players };
    console.log("count", count);
    if (count === 3) {
      if (players.impostor.players === 1) {
        copyPlayer.impostor.players--;
        copyPlayer.cheater.players++;
      } else {
        copyPlayer.impostor.players++;
        copyPlayer.cheater.players--;
      }
    } else if (action === "add") {
      copyPlayer.courteous--;
      if (type === "impostor") {
        copyPlayer.impostor.players++;
      } else {
        copyPlayer.cheater.players++;
      }
    } else {
      copyPlayer.courteous++;
      if (type === "impostor") {
        copyPlayer.impostor.players--;
      } else {
        copyPlayer.cheater.players--;
      }
    }

    setPlayers(copyPlayer);
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
    const courteous = players.courteous;
    const impostor = players.impostor.players;
    const cheater = players.cheater.players;
    return canAddPlayer(
      courteous,
      impostor,
      players.impostor.max,
      impostor + cheater
    );
  }, [players, canAddPlayer]);

  const showRemoveImpostorButton: boolean = useMemo(() => {
    const impostor = players.impostor.players;
    const cheater = players.cheater.players;
    return canRemovePlayer(impostor, cheater);
  }, [canRemovePlayer, players]);

  // ----- CHEATER -----

  const showAddCheaterButton: boolean = useMemo(() => {
    const courteous = players.courteous;
    const impostor = players.impostor.players;
    const cheater = players.cheater.players;
    return canAddPlayer(
      courteous,
      cheater,
      players.cheater.max,
      impostor + cheater
    );
  }, [players, canAddPlayer]);

  const showRemoveCheaterButton: boolean = useMemo(() => {
    const impostor = players.impostor.players;
    const cheater = players.cheater.players;
    return canRemovePlayer(cheater, impostor);
  }, [canRemovePlayer, players]);

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
            onClick={(e) => {
              e.preventDefault();
              setCountPlayer(countPlayer - 1);
            }}
            disabled={countPlayer <= 3}
          >
            <BigLess $disabled={countPlayer <= 3} />
          </ButtonIcon>
          <CountPlayer>{countPlayer}</CountPlayer>
          <ButtonIcon
            onClick={(e) => {
              e.preventDefault();
              setCountPlayer(countPlayer + 1);
            }}
            disabled={countPlayer >= 20}
          >
            <BigMore $disabled={countPlayer >= 20} />
          </ButtonIcon>
        </Counter>

        <PlayersContainer>
          <LinePlayers>
            <span />
            <CourteousStyle>{players.courteous} Courtois</CourteousStyle>
            <span />
          </LinePlayers>

          <LinePlayers>
            {!showRemoveImpostorButton && (
              <Less
                onClick={() => changePlayers("impostor", "remove", countPlayer)}
              />
            )}
            <ImpostorStyle>
              {players.impostor.players} Imposteur
              {`${players.impostor.players > 1 ? "s" : ""}`}
            </ImpostorStyle>
            {showAddImpostorButton && (
              <More
                onClick={() => changePlayers("impostor", "add", countPlayer)}
              />
            )}
          </LinePlayers>

          <LinePlayers>
            {!showRemoveCheaterButton && (
              <Less
                onClick={() => changePlayers("cheater", "remove", countPlayer)}
              />
            )}
            <CheaterStyle>
              {players.cheater.players} Tricheur
              {`${players.cheater.players > 1 ? "s" : ""}`}
            </CheaterStyle>
            {showAddCheaterButton && (
              <More
                onClick={() => changePlayers("cheater", "add", countPlayer)}
              />
            )}
          </LinePlayers>
        </PlayersContainer>
      </CreateGameContent>
      <Footer>
        <Button onClick={() => console.log("LOG", players)}>COMMENCER</Button>
      </Footer>
    </CreateGameContainer>
  );
};
