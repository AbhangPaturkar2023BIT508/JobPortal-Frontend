import React, { useEffect, useState } from "react";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Button, Divider, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { card } from "../../Data/JobDescData";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { postJob } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";

const JobDesc = (props) => {
  const [applied, setApplied] = useState(false);
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSaveJob = () => {
    console.log(profile.savedJobs);
    let savedJobs = profile.savedJobs || [];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };

  useEffect(() => {
    if (
      props.applicants?.filter((applicant) => applicant.applicantId === user.id)
        .length > 0
    ) {
      setApplied(true);
    } else setApplied(false);
  }, [props]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        successNotification("Success", "Job Closed Successfully");
        props.onJobUpdate?.({ ...props, jobStatus: "CLOSED" }); // 🔁 trigger update in parent
      })
      .catch((err) => {
        errorNotification("Error", err.response?.data?.errorMessage);
      });
  };

  return (
    <div className="w-2/3 bs-mx:w-full">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 shrink-0 rounded-xl">
            <img
              className="h-14 xs-mx:h-10 xs-mx:w-10"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl xs-mx:text-xl">
              {props.jobTitle}
            </div>

            <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base">
              <span>{props.company} &bull; </span>
              <span>{timeAgo(props.postTime)} &bull; </span>
              <span>
                {props.applicants ? props.applicants.length : 0} Applicants
              </span>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 items-center sm-mx:my-5 sm-mx:w-full sm-mx:[&>button]:w-1/2">
          {(props.edit || !applied) && (
            <Link
              to={
                props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`
              }
            >
              <Button size="sm" color="brightSun.4" variant="light">
                {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
              </Button>
            </Link>
          )}
          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button
              size="sm"
              color="red.5"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              className="text-bright-sun-400 cursor-pointer"
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
            />
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between gap-4 sm-mx:flex-wrap ">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8"
              color="brightSun.4"
              variant="light"
              size="lg"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300 xs-mx:text-sm">
              {item.name}
            </div>
            <div className="font-semibold xs-mx:text-sm">
              {props ? props[item.id] : "NA"}{" "}
              {item.id === "packageOffered" && <>LPA</>}
            </div>
          </div>
        ))}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill, index) => (
            <ActionIcon
              key={index}
              className="!h-fit font-medium !text-sm !w-fit xs-mx:!text-xs"
              color="brightSun.4"
              variant="light"
              p="xs"
              radius="xl"
              aria-label="Settings"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my="xl" />
      <div
        className="[&_h4]:text-xl [&_h4]:my-5 [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400  [&_li]:mb:1 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-sm"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.description),
        }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img
                className="h-8"
                src={`/Icons/${props.company}.png`}
                alt={props.company}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-lg">{props.company}</div>
              <div className="text-mine-shaft-300">10K+ Employees</div>
            </div>
          </div>

          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify xs-mx:text-sm">
          Here at UIHUT, we are a passionate, fun-loving, growing team. We are
          looking for passionate programmers who want to solve technical
          challenges and learn and incorporate new technologies into their
          skillset to join our team and grow with us. In this role, you would
          use various tech stacks, including Laravel, Node JS (Adonis JS), Vue
          JS, React JS, Nuxt JS, Redis, MySQL, MongoDB, and CSS. You will be
          engaged across the software development life cycle to create and
          modify platforms and capabilities in a collaborative and agile
          environment.
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
