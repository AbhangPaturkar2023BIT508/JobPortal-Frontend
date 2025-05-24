import { TextInput, Button } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const CertiInput = (props) => {
  const select = fields;
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue Date is requried"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let certi = [...profile.certification];

    certi.push(form.getValues());

    const adjustDate = (date) => {
      let d = new Date(date);
      d.setHours(12, 0, 0, 0); // Set time to noon before conversion
      return d.toISOString();
    };

    certi[certi.length - 1].issueDate = adjustDate(
      certi[certi.length - 1].issueDate
    );
    let updatedProfile = { ...profile, certification: certi };
    props.setEdit(false);
    try {
      dispatch(changeProfile(updatedProfile));
      successNotification("Success", "Certificate Added Successfully");
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full xs-mx:gap-1">
        <TextInput
          {...form.getInputProps("name")}
          label="Title"
          withAsterisk
          placeholder="Enter Title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full xs-mx:gap-1">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Pick Date"
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          label="Certificate ID"
          withAsterisk
          placeholder="Enter ID"
        />
      </div>
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

export default CertiInput;
