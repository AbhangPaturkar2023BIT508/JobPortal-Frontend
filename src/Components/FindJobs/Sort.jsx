import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateSort } from "../../Slices/SortSlice";

const jobSortOpt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];
const talentSortOpt = [
  "Relevance",
  "Experience (Low to High)",
  "Experience (High to Low)",
];

const Sort = (props) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("Relevance");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options =
    props.sort == "job"
      ? jobSortOpt.map((item) => (
          <Combobox.Option className="text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ))
      : talentSortOpt.map((item) => (
          <Combobox.Option className="text-xs" value={item} key={item}>
            {item}
          </Combobox.Option>
        ));

  return (
    <>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div
            onClick={() => combobox.toggleDropdown()}
            className="cursor-pointer gap-2 border border-bright-sun-400 ml-2 flex px-2 py-1 text-sm xs-mx:text-xs xs-mx:px-1 xs-mx:py-0 rounded-xl items-center "
          >
            {selectedItem}{" "}
            <IconAdjustments className="text-bright-sun-400 w-5 h-5" />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default Sort;
