import React from "react";
import { IconBookmark } from "@tabler/icons-react";
import { Button, Divider, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { card } from "../../Data/JobDescData";
import { timeAgo } from "../../Services/Utilities";

const JobDesc = (props) => {
  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img
              className="h-14"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &bull; {timeAgo(props.postTime)} &bull;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link to={`/apply-job/${props.id}`}>
            <Button size="sm" color="brightSun.4" variant="light">
              {props.edit ? "Edit" : "Apply"}
            </Button>
          </Link>
          {props.edit ? (
            <Button size="sm" color="red.5" variant="outline">
              Delete
            </Button>
          ) : (
            <IconBookmark className="text-bright-sun-400 cursor-pointer" />
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              className="!h-12 !w-12"
              color="brightSun.4"
              variant="light"
              size="lg"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">
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
              className="!h-fit font-medium !text-sm !w-fit"
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
        className="[&_h4]:text-xl [&_h4]:my-5 [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400  [&_li]:mb:1 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify "
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.description),
        }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3">
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
        <div className="text-mine-shaft-300 text-justify">
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
