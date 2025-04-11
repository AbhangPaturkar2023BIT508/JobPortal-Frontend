import React, { useEffect, useState } from "react";
import { Divider } from "@mantine/core";
import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {}, [job]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);
        if (res && res.length > 0 && Number(id) == 0)
          Navigate(`/posted-job/${res[0].id}`);
        const selectedJob = res.find(
          (item) => item.id.toString() === id.toString()
        );
        setJob(selectedJob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, user.id]);
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <Divider size="xs" />
      <div className="flex gap-5">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;
