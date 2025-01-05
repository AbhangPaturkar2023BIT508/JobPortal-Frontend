import { Button } from "@mantine/core";
import React, { useState } from "react";
import ExpInput from "./ExpInput";

const ExpCard = (props) => {
  const [edit, setEdit] = useState(false);
  return !edit ? (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
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
        <div className="text-sm text-mine-shaft-300">
          {props.startDate} - {props.endDate}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 test-justify">
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
          <Button color="red.8" variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput setEdit={setEdit} />
  );
};

export default ExpCard;
