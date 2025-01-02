import React from "react";
import Jobs from "../FindJobs/Jobs";
import { jobList } from "../Data/JobsData";
import JobCards from "../FindJobs/JobCards";

const RecommendedJobs = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList.map(
          (job, index) => index < 6 && <JobCards key={index} {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
