import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CreateGame } from "./create-game";
import { PlayerContext } from "../../App";

describe("CreateGamePage", () => {
  it(`
    Given I arrive on the page
    Then The counter is at 5 by default
        And courteous counter is at 3 by default
        And impostor counter is at 1 by default
        And cheater counter is at 1 by default
`, () => {
    render(
      <PlayerContext.Provider
        value={{
          game: {
            players: [],
            numberPlayer: 5,
            ranked: [],
          },
          setGame: () => [],
        }}
      >
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </PlayerContext.Provider>
    );
    const CountPlayer = screen.getByRole("paragraph", {
      name: "count-player",
    });
    const CourteousPlayer = screen.getByRole("paragraph", {
      name: "courteous-player",
    });
    const ImpostorPlayer = screen.getByRole("paragraph", {
      name: "impostor-player",
    });
    const CheaterPlayer = screen.getByRole("paragraph", {
      name: "cheater-player",
    });
    expect(CountPlayer).toHaveTextContent("5");
    expect(CourteousPlayer).toHaveTextContent("3 Courtois");
    expect(ImpostorPlayer).toHaveTextContent("1 Imposteur");
    expect(CheaterPlayer).toHaveTextContent("1 Tricheur");
  });

  test(`
    Given I arrive on this page
    When I click on add count button
    Then the counter is egal at 6
`, () => {
    render(
      <PlayerContext.Provider
        value={{
          game: {
            players: [],
            numberPlayer: 5,
            ranked: [],
          },
          setGame: () => [],
        }}
      >
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </PlayerContext.Provider>
    );

    const CountPlayer = screen.getByRole("paragraph", {
      name: "count-player",
    });

    const AddButton = screen.getByRole("button", {
      name: "add-button",
    });

    fireEvent.click(AddButton);
    expect(CountPlayer).toHaveTextContent("6");
  });

  test(`
    Given I arrive on this page
    When I click on remove count button
    Then the counter is egal at 4
`, () => {
    render(
      <PlayerContext.Provider
        value={{
          game: {
            players: [],
            numberPlayer: 5,
            ranked: [],
          },
          setGame: () => [],
        }}
      >
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </PlayerContext.Provider>
    );
    const CountPlayer = screen.getByRole("paragraph", {
      name: "count-player",
    });

    const RemoveButton = screen.getByRole("button", {
      name: "less-button",
    });
    fireEvent.click(RemoveButton);
    expect(CountPlayer).toHaveTextContent("4");
  });

  test(`
    Given i'm on this page
    When I click 2 times on the remove button
    Then the counter of player is egal at 3
        And the remove button is disabled
`, () => {
    render(
      <PlayerContext.Provider
        value={{
          game: {
            players: [],
            numberPlayer: 5,
            ranked: [],
          },
          setGame: () => [],
        }}
      >
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </PlayerContext.Provider>
    );
    const CountPlayer = screen.getByRole("paragraph", {
      name: "count-player",
    });

    const LessButton = screen.getByRole("button", {
      name: "less-button",
    });
    fireEvent.click(LessButton);
    fireEvent.click(LessButton);
    expect(CountPlayer).toHaveTextContent("3");
    expect(LessButton).toHaveAttribute("disabled");
  });

  test(`
    Given I arrive on this page
    When i click one the remove impostor button
    Then the courteous counter is egal at 4
        And the impostor counter is egal at 0
        And the remove impostor button disappears
        And the add impostor button appears
`, () => {
    render(
      <PlayerContext.Provider
        value={{
          game: {
            players: [],
            numberPlayer: 5,
            ranked: [],
          },
          setGame: () => [],
        }}
      >
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </PlayerContext.Provider>
    );

    const LessImpostor = screen.getByRole("button", {
      name: "less-impostor",
    });

    expect(LessImpostor).toBeVisible();
    fireEvent.click(LessImpostor);

    const MoreImpostor = screen.getByRole("button", {
      name: "more-impostor",
    });

    const CourteousPlayer = screen.getByRole("paragraph", {
      name: "courteous-player",
    });
    const ImpostorPlayer = screen.getByRole("paragraph", {
      name: "impostor-player",
    });
    expect(CourteousPlayer).toHaveTextContent("4 Courtois");
    expect(ImpostorPlayer).toHaveTextContent("0 Imposteur");
    expect(LessImpostor).not.toBeVisible();
    expect(MoreImpostor).toBeVisible();
  });
});
