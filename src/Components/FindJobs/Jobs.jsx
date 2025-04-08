import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import JobCards from "./JobCards";
// import { jobList } from "../../Data/JobsData";
import { getAllJobs } from "../../Services/JobService";

const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
