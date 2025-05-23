import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { Divider, RangeSlider, Input, Button, Collapse } from "@mantine/core";
import { searchFields } from "../../Data/TalentData";
import { IconFilter, IconUserCircle, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
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
        <div className=" lg-mx:flex-wrap flex px-5 py-8 items-center !text-mine-shaft-100">
          <div className="flex items-center lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full">
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
                <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-2">
                  <MultiInput
                    title={item.title}
                    icon={item.icon}
                    options={item.options}
                  />
                </div>
                <Divider
                  className="sm-mx:hidden"
                  mr="xs"
                  size="xs"
                  orientation="vertical"
                />
              </React.Fragment>
            );
          })}
          <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full [&_.mantine-Slider-label]:!translate-y-10 xs-mx:mb-2">
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
      </Collapse>
    </div>
  );
};

export default SearchBar;
