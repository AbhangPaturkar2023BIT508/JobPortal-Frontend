import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { Divider, RangeSlider, Input } from "@mantine/core";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState([1, 100]);
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 p-1 mr-2 rounded-full">
          <IconUserCircle size={20} />
        </div>
        <Input
          className="[&_input]:!placeholder-mine-shaft-300 "
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
      {searchFields.map((item, index) => (
        <>
          <div key={index} className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          size="xs"
          color="brightSun.4"
          value={value}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
