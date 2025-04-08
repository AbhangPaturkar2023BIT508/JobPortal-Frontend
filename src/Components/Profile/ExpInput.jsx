import React, { useEffect } from "react";
import fields from "../../Data/Profile";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
// import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const ExpInput = (props) => {
  const select = fields;
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startsDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
    }
  }, []);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startsDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is requried"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    // console.log(profile.experience);
    let exp = [...profile.experience];
    const adjustDate = (date) => {
      let d = new Date(date);
      d.setHours(12, 0, 0, 0); // Set time to noon before conversion
      return d.toISOString();
    };
    if (props.add) {
      exp.push(form.getValues());
      exp[exp.length - 1].startDate = adjustDate(
        exp[exp.length - 1].startsDate
      );
      exp[exp.length - 1].endDate = adjustDate(exp[exp.length - 1].endDate);
    } else {
      exp[props.index] = form.getValues();

      exp[props.index].startDate = adjustDate(exp[props.index].startsDate);
      exp[props.index].endDate = adjustDate(exp[props.index].endDate);
    }
    let updatedProfile = { ...profile, experience: exp };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(
      "Success",
      `Experience ${props.add ? "Added" : "Updated"} Successfully`
    );
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add " : "Edit "}Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        autosize
        minRows={3}
        label="Summary"
        placeholder="Enter Summary..."
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startsDate")}
          withAsterisk
          maxDate={form.getValues().endDate || undefined}
          label="Start Date"
          placeholder="Pick Date"
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          disabled={form.getValues().working}
          withAsterisk
          minDate={form.getValues().startsDate || undefined}
          maxDate={new Date()}
          label="End Date"
          placeholder="Pick Date"
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(e) => form.setFieldValue("working", e.currentTarget.checked)}
        autoContrast
        label="Currently working here"
      />
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
