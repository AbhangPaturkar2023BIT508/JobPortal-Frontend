import React, { useEffect, useState } from "react";
import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/TalentCard";
const PostedJobDesc = (props) => {
  const [tab, setTab] = React.useState("overview");
  const [arr, setArr] = useState([]);
  const handleTabChange = (value) => {
    setTab(value);
    if (value === "applicants") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "APPLIED")
      );
    } else if (value === "invited") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "INTERVIEWING")
      );
    } else if (value === "offered") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "OFFERED")
      );
    } else if (value === "rejected") {
      setArr(
        props.applicants?.filter((x) => x.applicationStatus === "REJECTED")
      );
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);
  return (
    <div className="w-3/4 p-5 md-mx:p-0 md-mx:w-full">
      {props.jobTitle ? (
        <>
          <div className="text-2xl xs-mx:text-xl font-semibold flex items-center ">
            {props.jobTitle}
            <Badge variant="light" ml="sm" color="brightSun.4" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium xs-mx:text-sm text-mine-shaft-300 mb-5">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List
                className="[&_button]:!text-xl  sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5
          xs-mx:[&_button]:!py-1 font-semibold mb-5 xs-mx:font-medium [&_button[data-active='true']]:text-bright-sun-400"
              >
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDesc
                  {...props}
                  edit={true}
                  closed={props.jobStatus === "CLOSED"}
                />
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent, index) => (
                      <TalentCard key={index} {...talent} posted />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Applicants</div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="invited">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent, index) => (
                      <TalentCard key={index} {...talent} invited />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Invited Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="offered">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent, index) => (
                      <TalentCard key={index} {...talent} offered />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Offered Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent, index) => (
                      <TalentCard key={index} {...talent} rejected />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Rejected Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold flex mn-h-[70vh] justify-center items-center ">
          No Job selected
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;
