import React from "react";
import { Tabs, Avatar, Divider } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import About from "./About";
import Jobs from "./Jobs";
import ComponyEmployee from "./ComponyEmployee";

const Company = (props) => {
  return (
    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-3xl p-2 bg-mine-shaft-950 h-36 w-36 -bottom-1/3 left-5 border-mine-shaft-950 border-8 absolute"
          src="/Icons/Google.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <Avatar.Group>
            <Avatar src="avatar.png" />
            <Avatar src="avatar1.png" />
            <Avatar src="avatar2.png" />
            <Avatar>+10K</Avatar>
          </Avatar.Group>
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-400">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          New York, United State
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about">
            <About />
          </Tabs.Panel>
          <Tabs.Panel value="jobs">
            <Jobs />
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <ComponyEmployee />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
