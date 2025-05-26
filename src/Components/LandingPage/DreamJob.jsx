import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5">
      <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
        <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-4xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">
          Find your <span>dream</span> <span>job</span> with us
        </div>
        <div className="text-lg md-mx:text-base sm-mx:text-sm text-mine-shaft-200">
          Good life begins with a good company. Start explore thousands of jobs
          in one place.
        </div>
        <div className="flex gap-3 mt-5">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-2 px-2 text-mine-shaft-100  [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job"
            placeholder="Software Engineer"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-2 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Type"
            placeholder="Full Time"
          />
          <div className="flex items-center justify-center h-[100] w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>
      <div className="w-[55%] sm-mx:w-full  flex items-center justify-center">
        <div className="w-[30rem] relative">
          <img src="/Boy.png" alt="boy" />
          <div className="absolute -right-10 bs-mx:right-0 w-fit xs-mx:top-[10%] top-[50%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md xs-mx:-left-1">
            <div className="text-center text-sm text-mine-shaft-100 mb-1">
              10K+ got job
            </div>
            <Avatar.Group>
              <Avatar src="/avatar.png" />
              <Avatar src="/avatar1.png" />
              <Avatar src="/avatar2.png" />
              <Avatar>+9K</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute xs:-left-5 bs-mx:top-[35%] xs-mx:top-[60%] w-fit top-[28%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col xs-mx:right-0">
            <div className="flex gap-2 items-center mb-3">
              <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg ">
                <img src="/Google.png" alt="Google-logo" />
              </div>
              <div className="text-sm text-mine-shaft-100 ">
                <div>Software Engineer</div>
                <div className="text-mine-shaft-200 text-xs">New York</div>
              </div>
            </div>
            <div className="flex gap-2 justify-around text-mine-shaft-200 text-xs">
              <span>1 Day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
