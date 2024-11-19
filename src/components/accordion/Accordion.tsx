import React from "react";
import AccordionWrapper from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../modal/ConfirmModal";
import {
  createTreeNode,
  deleteTreeNode,
  renameTreeNode,
  TreeData,
} from "../../api/requests";
import { ModalActionType, ParamsName } from "../../constants";

export type EventClick = React.MouseEvent<
  HTMLButtonElement | SVGSVGElement,
  MouseEvent
>;

type Props = {
  treeName: string;
  data: TreeData;
  handleCallData: () => void;
};
const Accordion = ({ treeName, data, handleCallData }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [actionType, setActionType] = React.useState<ModalActionType>(
    ModalActionType.Create
  );

  const handleOpen = (e: EventClick, action: ModalActionType) => {
    e.stopPropagation();
    setActionType(action);
    setOpen(true);
  };

  const handleClose = (e: EventClick) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirmButton = (
    actionType: ModalActionType,
    nodeName?: string
  ) => {
    switch (actionType) {
      case ModalActionType.Create: {
        createTreeNode([
          {
            name: ParamsName.TreeName,
            data: treeName,
          },
          {
            name: ParamsName.ParentNodeId,
            data: data.id,
          },
          { name: ParamsName.NodeName, data: nodeName ?? "" },
        ]);
        handleCallData();
        setOpen(false);
        break;
      }
      case ModalActionType.Rename: {
        renameTreeNode([
          {
            name: ParamsName.TreeName,
            data: treeName,
          },
          {
            name: ParamsName.Nodeid,
            data: data.id,
          },
          { name: ParamsName.NewNodeName, data: nodeName ?? "" },
        ]);
        handleCallData();
        setOpen(false);
        break;
      }
      case ModalActionType.Delete: {
        deleteTreeNode([
          {
            name: ParamsName.TreeName,
            data: treeName,
          },
          {
            name: ParamsName.Nodeid,
            data: data.id,
          },
        ]);
        handleCallData();
        setOpen(false);
        break;
      }
      default:
        setOpen(false);
    }
  };
  return (
    <AccordionWrapper key={data.id}>
      <AccordionSummary
        expandIcon={data.children?.length ? <ExpandMoreIcon /> : ""}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Typography>{data.name}</Typography>
        <div className="icon-container">
          <AddCircleOutlineIcon
            color="primary"
            onClick={(e) => handleOpen(e, ModalActionType.Create)}
          />
          <EditIcon
            color="primary"
            onClick={(e) => handleOpen(e, ModalActionType.Rename)}
          />
          <DeleteIcon
            color="error"
            onClick={(e) => handleOpen(e, ModalActionType.Delete)}
          />
          <ConfirmModal
            isOpen={open}
            actionType={actionType}
            handleClose={handleClose}
            handleConfirmButton={handleConfirmButton}
            nodeName={data.name}
          />
        </div>
      </AccordionSummary>
      {data.children && (
        <AccordionDetails>
          {data.children.map((el) => (
            <React.Fragment key={el.id}>
              {
                <Accordion
                  treeName={treeName}
                  data={el}
                  handleCallData={handleCallData}
                />
              }
            </React.Fragment>
          ))}
        </AccordionDetails>
      )}
    </AccordionWrapper>
  );
};

export default Accordion;
