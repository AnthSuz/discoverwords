import "./App.css";
import styled from "styled-components";
import { Home } from "./pages/home/home";
import { device } from "./utils/device";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateGame } from "./pages/create-game/create-game";
import { createContext, useState } from "react";
import React from "react";

const AppContainer = styled.div`
  background-color: #f1f5f9;
  height: 100svh;
  display: flex;
  justify-content: center;
`;

const AppContent = styled.div`
  background: linear-gradient(180deg, #e2e8f0 0%, #f8f9fb 100%);
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto;

  @media ${device.desktop} {
    width: 50%;
    height: 90%;
    border-radius: 8px;
    margin: 8px;
    border: 8px solid white;
  }
`;

export type Player = {
  id: number;
  role: string | "courteous" | "impostor" | "cheater";
  name: string;
  assignedWord: string;
  eliminated: boolean;
  point: number;
  color?: string;
};

export type Ranking = {
  name: string;
  points: number;
};

interface GameType {
  players: Player[];
  numberPlayer: number;
}

export interface ContextType {
  game: GameType;
  setGame: React.Dispatch<React.SetStateAction<GameType>>;
}
export const PlayerContext = createContext<ContextType | null>(null);

const App = () => {
  const [game, setGame] = useState<GameType>({
    players: [
      {
        id: 0,
        role: "cheater",
        name: "Anthony",
        assignedWord: "Maison",
        eliminated: false,
        point: 0,
      },
    ],
    numberPlayer: 0,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create-game",
      element: <CreateGame />,
    },
  ]);
  return (
    <PlayerContext.Provider
      value={{
        game,
        setGame,
      }}
    >
      <AppContainer>
        <AppContent>
          <RouterProvider router={router} />
        </AppContent>
      </AppContainer>
    </PlayerContext.Provider>
  );
};

export default App;
