import "./App.css";
import styled from "styled-components";
import { Home } from "./pages/home";
import { device } from "./utils/device";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppContainer = styled.div`
  background-color: #f1f5f9;
  height: 100svh;
  display: flex;
`;

const AppContent = styled.div`
  background: linear-gradient(180deg, #e2e8f0 0%, #f8f9fb 100%);
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media ${device.desktop} {
    width: 50%;
    height: 90%;
    border-radius: 8px;
    margin: 8px;
    border: 8px solid white;
  }
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <AppContainer>
      <AppContent>
        <h1 style={{ textAlign: "center" }}>Discover Words</h1>
        <RouterProvider router={router} />
      </AppContent>
    </AppContainer>
  );
}

export default App;
