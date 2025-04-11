import React from "react";
import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props) => {
  const { id } = useParams();

  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={` rounded-xl p-2 border-l-2  ${
        props.id == id
          ? "bg-bright-sun-400 text-black border-l-mine-shaft-100"
          : "bg-mine-shaft-900 text-mine-shaft-300 border-l-bright-sun-400"
      }`}
    >
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">Posted {timeAgo(props.postTime)}</div>
    </Link>
  );
};

export default PostedJobCard;
