import { Button } from "@mantine/core";
import React, { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const ExpCard = (props) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const handleDelete = () => {
    let exp = [...profile.experience];
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experience: exp };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Experience Deleted Successfully");
  };
  return !edit ? (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between flex-wrap gap-2 ">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.compnay} &#x2022; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm  text-mine-shaft-300">
          {formatDate(props.startDate)} -{" "}
          {props.working ? "Present" : formatDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm xs-mx:text-xs text-mine-shaft-300 test-justify">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-5">
          <Button
            color="brightSun.4"
            variant="outline"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button color="red.8" variant="light" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};

export default ExpCard;
