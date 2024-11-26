import { fireEvent, render, screen } from "@testing-library/react";
import { Home } from "../home/home";
import { BrowserRouter } from "react-router-dom";

test("Given when then", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const PlayButton = screen.getByRole("button", {
    name: "PLAY",
  });
  expect(PlayButton).toBeInTheDocument();
});

test(`Given I'm on the Home Page
      When I click on the rules button
      Then the rules modal's is open
  `, () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const RulesButton = screen.getByRole("button", {
    name: "Règles",
  });
  expect(RulesButton).toBeInTheDocument();
  fireEvent.click(RulesButton);

  const Modal = screen.getByLabelText("rules-modal");

  expect(Modal).toBeVisible();
});
