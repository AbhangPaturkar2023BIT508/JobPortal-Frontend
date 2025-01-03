import React from "react";
import Sort from "./Sort";
import JobCards from "./JobCards";
import { jobList } from "../Data/JobsData";

const Jobs = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recomended Jods</div>
        <Sort />
      </div>
      <div className="flex mt-10 flex-wrap gap-5 justify-around">
        {jobList.map((job, index) => (
          <JobCards key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
