import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { jobList } from "../../Data/JobsData";
import CardJobHistory from "./CardJobHistory";
import { getAllJobs } from "../../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = React.useState("APPLIED");
  const [jobList, setJobList] = useState([]);
  const [showList, setShowList] = useState([]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter((job) => {
            let found = false;
            job.applicants?.forEach((applicant) => {
              if (applicant.applicantId === user.id) {
                if (applicant.applicationStatus === "APPLIED") found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(jobList.filter((job) => profile.savedJobs?.includes(job.id)));
    } else {
      setShowList(
        jobList.filter((job) => {
          let found = false;
          job.applicants?.forEach((applicant) => {
            if (applicant.applicantId === user.id) {
              if (applicant.applicationStatus === value) found = true;
            }
          });
          return found;
        })
      );
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs
          variant="outline"
          radius="lg"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="flex mt-10 flex-wrap gap-5 justify-around">
              {showList.map((job, index) => (
                <CardJobHistory
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                />
              ))}
            </div>
          </Tabs.Panel>
          {/* <Tabs.Panel value="saved">
            <div className="flex mt-10 flex-wrap gap-5 justify-around">
              {jobList.map((job, index) => (
                <CardJobHistory key={index} {...job} saved />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered">
            <div className="flex mt-10 flex-wrap gap-5 justify-around">
              {jobList.map((job, index) => (
                <CardJobHistory key={index} {...job} offered />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="interviewing">
            <div className="flex mt-10 flex-wrap gap-5 justify-around">
              {jobList.map((job, index) => (
                <CardJobHistory key={index} {...job} interviewing />
              ))}
            </div>
          </Tabs.Panel> */}
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
