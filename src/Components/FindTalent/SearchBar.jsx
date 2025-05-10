import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { Divider, RangeSlider, Input } from "@mantine/core";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 50]);
  const [name, setName] = useState("");
  const handleChange = (name, event) => {
    if (name === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 p-1 mr-2 rounded-full">
          <IconUserCircle size={20} />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          className="[&_input]:!placeholder-mine-shaft-300 "
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
      {searchFields.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="w-1/5">
              <MultiInput
                title={item.title}
                icon={item.icon}
                options={item.options}
              />
            </div>
            <Divider mr="xs" size="xs" orientation="vertical" />
          </React.Fragment>
        );
      })}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Experience (Year)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          max={50}
          min={1}
          minRange={1}
          onChangeEnd={(e) => handleChange("exp", e)}
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
