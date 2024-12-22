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

export const IconName = styled.p<{ $color?: string }>`
  background-color: rgba(${(props) => props.$color || "255, 255, 255"}, 1);
  height: 80px;
  width: 80px;
  border-radius: 50%;
  font-size: 40px;
  margin-bottom: 16px;
  color: ${(props) => (props.$color ? "white" : "black")};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 15px 0px white;
  text-transform: uppercase;
`;

export const Name = styled.p<{ $color?: string }>`
  color: ${(props) => (props.$color ? "white" : "black")};
  background-color: rgba(${(props) => props.$color || "255, 255, 255"}, 1);
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0px 0px 15px 0px white;
  margin-bottom: 16px;
`;

export const TitleModal = styled.h1`
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled.button<{ $color: string }>`
  background-color: rgba(${(props) => props.$color}, 1);
  color: white;
  border-radius: 8px;
  height: 40px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

export const CancelButton = styled.button<{ $color: string }>`
  background-color: white;
  color: rgba(${(props) => props.$color}, 1);
  border: 1px solid rgba(${(props) => props.$color}, 1);
  border-radius: 8px;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-right: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
