import React, { useState } from "react";
import MultiInput from "./MultiInput";
import { dropdownData } from "../../Data/JobsData";
import { Divider, RangeSlider } from "@mantine/core";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 300]);

  const handleChange = (event) => {
    dispatch(updateFilter({ salary: event }));
  };
  return (
    <div className="flex px-5 py-8">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div key={index} className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          max={300}
          min={1}
          minRange={1}
          size="xs"
          color="brightSun.4"
          value={value}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChangeEnd={handleChange}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
