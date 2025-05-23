import React, { use, useState } from "react";
import MultiInput from "./MultiInput";
import { dropdownData } from "../../Data/JobsData";
import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Icon123, IconFilter, IconX } from "@tabler/icons-react";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 300]);

  const handleChange = (event) => {
    dispatch(updateFilter({ salary: event }));
  };
  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            size="xs"
            m="xs"
            radius="md"
            onClick={toggle}
            autoContrast
            variant="outline"
            color="brightSun.4"
            rightSection={opened ? <IconX /> : <IconFilter />}
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
        <div className="lg-mx:flex-wrap flex px-5 py-8">
          {dropdownData.map((item, index) => (
            <React.Fragment key={index}>
              <div
                key={index}
                className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-2"
              >
                <MultiInput {...item} />
              </div>
              <Divider
                className="sm-mx:hidden"
                mr="xs"
                size="xs"
                orientation="vertical"
              />
            </React.Fragment>
          ))}
          <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] [&_.mantine-Slider-label]:!translate-y-10 xs-mx:w-full xs-mx:mb-2">
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
      </Collapse>
    </div>
  );
};

export default SearchBar;
