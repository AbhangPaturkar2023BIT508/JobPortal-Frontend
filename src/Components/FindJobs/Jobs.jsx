import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import JobCards from "./JobCards";
// import { jobList } from "../../Data/JobsData";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job) => job.jobStatus === "ACTIVE"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (sort == "Most Recent") {
      setJobList(
        [...jobList].sort(
          (a, b) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary (Low to High)") {
      setJobList(
        [...jobList].sort((a, b) => a.packageOffered - b.packageOffered)
      );
    } else if (sort == "Salary (High to Low)") {
      setJobList(
        [...jobList].sort((a, b) => b.packageOffered - a.packageOffered)
      );
    }
  }, [sort]);

  useEffect(() => {
    let filterJobs = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterJobs = filterJobs.filter((job) =>
        filter["Job Title"]?.some((title) =>
          job.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filterJobs = filterJobs.filter((job) =>
        filter.Location?.some((location) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Experience && filter.Experience.length > 0) {
      filterJobs = filterJobs.filter((job) =>
        filter.Experience?.some((exp) =>
          job.experience?.toLowerCase().includes(exp.toLowerCase())
        )
      );
    }
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filterJobs = filterJobs.filter((job) =>
        filter["Job Type"]?.some((type) =>
          job.jobType.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
    if (filter.salary && filter.salary.length > 0) {
      filterJobs = filterJobs.filter(
        (job) =>
          job.packageOffered >= filter.salary[0] &&
          job.packageOffered <= filter.salary[1]
      );
    }
    setFilteredJobs(filterJobs);
  }, [filter, jobList]);
  return (
    <div className="p-5">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="text-2xl font-semibold xs-mx:text-xl ">
          Recomended Jods
        </div>
        <Sort sort="job" />
      </div>
      <div className="flex mt-10 flex-wrap gap-5 justify-around">
        {filteredJobs.map((job, index) => (
          <JobCards key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
