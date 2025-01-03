import React from "react";
import { jobList } from "../Data/JobsData";
import JobCards from "../FindJobs/JobCards";

const Jobs = () => {
  return (
    <div className="flex mt-10 flex-wrap gap-3 justify-around">
      {jobList.map((job, index) => (
        <JobCards key={index} {...job} />
      ))}
    </div>
  );
};

export default Jobs;
