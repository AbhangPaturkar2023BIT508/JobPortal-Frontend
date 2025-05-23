import React from "react";
import { Divider } from "@mantine/core";
import { timeAgo } from "../../Services/Utilities";
import ApplicationForm from "./ApplicationForm";

const ApplyJob = (props) => {
  return (
    <>
      <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full m-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-3 shrink-0 bg-mine-shaft-800 rounded-xl">
              <img
                className="h-14 w-14 xs-mx:h-10 xs-mx:w-10"
                src={`/Icons/${props.company}.png`}
                alt={props.company}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl xs-mx:text-xl">
                {props.jobTitle}
              </div>
              <div className="text-lg flex-wrap text-mine-shaft-300 xs-mx:text-base">
                <span>{props.company} &bull; </span>
                <span>{timeAgo(props.postTime)} &bull; </span>
                <span>
                  {props.applicants ? props.applicants.length : 0} Applicants
                </span>
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <ApplicationForm />
      </div>
    </>
  );
};

export default ApplyJob;
