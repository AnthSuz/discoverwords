import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  TitleModal,
} from "../utils/styled";
import { Modal } from "./ui/modal";

interface AlertConfirmSelectedPlayerType {
  closeAlertConfirmPlayer: (name: string) => void;
  onConfirm: () => void;
  name: string;
  color: string;
}

export const AlertConfirmSelectedPlayer = ({
  closeAlertConfirmPlayer,
  onConfirm,
  name,
  color,
}: AlertConfirmSelectedPlayerType) => {
  return (
    <Modal
      type="alert"
      hideCloseButton
      closeModal={() => closeAlertConfirmPlayer("alertConfirmPlayer")}
    >
      <TitleModal>Es tu {name} ?</TitleModal>
      <ButtonContainer>
        <CancelButton
          $color={color}
          onClick={() => closeAlertConfirmPlayer("alertConfirmPlayer")}
        >
          Annuler
        </CancelButton>
        <ConfirmButton
          $color={color}
          onClick={() => {
            onConfirm();
            closeAlertConfirmPlayer("alertConfirmPlayer");
          }}
        >
          Oui
        </ConfirmButton>
      </ButtonContainer>
    </Modal>
  );
};
