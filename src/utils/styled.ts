import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  width: 60%;
  padding: 12px;
  background-color: white;
  border: 1px solid #e8e9ea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 4px;
  color: #595959;
  text-transform: uppercase;

  &:hover {
    box-shadow: 0px 3px 8px 0px #e8e9ea;
  }
`;

export const PlayerStyle = styled.p`
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  padding: 4px 16px;
  box-shadow: 0px 3px 8px 0px #e8e9ea;
  cursor: pointer;
`;

export const CourteousStyle = styled(PlayerStyle)`
  background-color: #0d7490;
  color: white;
`;

export const ImpostorStyle = styled(PlayerStyle)`
  background-color: black;
  color: white;
`;

export const CheaterStyle = styled(PlayerStyle)`
  background-color: white;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  padding: 4px 16px;
  box-shadow: 0px 3px 8px 0px #e8e9ea;
  cursor: pointer;
`;

export const LinkButton = styled(Link)`
  width: 100%;
  text-align: center;
  text-decoration: none;
`;
