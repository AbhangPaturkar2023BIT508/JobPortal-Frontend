import React, { useEffect } from "react";
import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";

const PostedJob = (props) => {
  const [activeTab, setActiveTab] = React.useState("ACTIVE");
  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);
  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
        <Tabs
          autoContrast
          variant="pills"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {
                props.jobList?.filter((job) => job?.jobStatus === "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Drafts [
              {
                props.jobList?.filter((job) => job?.jobStatus === "DRAFT")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="CLOSED">
              Closed [
              {
                props.jobList?.filter((job) => job?.jobStatus === "CLOSED")
                  .length
              }
              ]
            </Tabs.Tab>
          </Tabs.List>
          <div className="flex flex-col gap-5 mt-5">
            {props.jobList
              ?.filter((job) => job?.jobStatus === activeTab)
              .map((item, index) => (
                <PostedJobCard key={index} {...item} />
              ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJob;
