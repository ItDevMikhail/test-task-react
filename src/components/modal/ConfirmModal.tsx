import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Button from "@mui/material/Button";
import { ModalActionType } from "../../constants";
import { EventClick } from "../accordion/Accordion";

type Props = {
  isOpen: boolean;
  actionType: ModalActionType;
  handleClose: (e: EventClick) => void;
  handleConfirmButton: (actionType: ModalActionType, nodeName?: string) => void;
  nodeName: string;
};

const ConfirmModal = ({
  isOpen,
  actionType,
  handleClose,
  handleConfirmButton,
  nodeName: currentNodeName,
}: Props) => {
  const [nodeName, setNodeName] = React.useState<string>(currentNodeName);

  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClick={(e: EventClick) => {
          e.stopPropagation();
        }}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            {actionType}
          </h2>
          {actionType === ModalActionType.Delete && (
            <p id="unstyled-modal-description" className="modal-description">
              Do you want to delete {currentNodeName} ?
            </p>
          )}
          {actionType !== ModalActionType.Delete && (
            <InputElement
              defaultValue={
                actionType === ModalActionType.Rename
                  ? currentNodeName
                  : undefined
              }
              onChange={(e) => {
                setNodeName(e.target.value);
              }}
              placeholder="enter name"
            />
          )}
          <ButtonWrapper>
            <Button
              onClick={() => handleConfirmButton(actionType, nodeName)}
              variant="outlined"
            >
              {actionType}
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </ButtonWrapper>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const InputElement = styled("input")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }`
);

const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export default ConfirmModal;
