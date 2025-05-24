import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard = (props) => {
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleDelete = () => {
    let certi = [...profile.certification];
    certi.splice(props.index, 1);
    let updatedProfile = { ...profile, certification: certi };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate Deleted Successfully");
  };
  return (
    <div className="flex justify-between sm-mx:flex-wrap gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 shrink-0 rounded-md">
          <img
            className="h-7"
            src={`/Icons/${props.issuer}.png`}
            alt={props.issuer}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm">{props.name}</div>
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">
            {props.issuer}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col sm-mx:flex-row sm-mx:gap-2 items-end">
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">
            Issued on: {formatDate(props.issueDate)}
          </div>
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">
            ID: {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            onClick={handleDelete}
            size={matches ? "md" : "lg"}
            color="red.8"
            variant="subtle"
          >
            <IconTrash stroke={1.5} className="h-4/5 w-4/5" />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertiCard;
