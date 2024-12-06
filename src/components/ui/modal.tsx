import { ReactElement } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { device } from "../../utils/device";

interface ModalProps {
  title?: string;
  children: ReactElement | ReactElement[];
  closeModal?: () => void;
  label?: string;
  hideCloseButton?: boolean;
  type?: "modal" | "alert";
  bgColor?: string;
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 49;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<{ $type?: string; $bgColor: string }>`
  min-height: ${(props) => (props.$type === "alert" ? "20%" : "50%")};
  max-height: 80%;
  width: 80%;
  @media ${device.mobile} {
    width: 40%;
  }
  position: absolute;
  z-index: 50;
  background-color: ${(props) => props.$bgColor};
  border-radius: 8px;
  padding: 16px;
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseIcon = styled(X)`
  cursor: pointer;
`;

export const Modal = ({
  title,
  children,
  closeModal,
  label,
  hideCloseButton = false,
  type = "modal",
  bgColor = "white",
}: ModalProps) => {
  return (
    <ModalContainer onClick={closeModal} aria-label={label}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $type={type}
        $bgColor={bgColor}
      >
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {!hideCloseButton && <CloseIcon onClick={closeModal} />}
          </ModalHeader>
        )}
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
