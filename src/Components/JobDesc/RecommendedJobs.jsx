import React, { useState, useEffect } from "react";
import JobCards from "../FindJobs/JobCards";
import { useParams } from "react-router-dom";
import { getAllJobs } from "../../Services/JobService";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs()
      .then((response) => {
        setJobList(response);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  });
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList?.map(
          (job, index) =>
            index < 6 && id !== job.id && <JobCards key={index} {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
