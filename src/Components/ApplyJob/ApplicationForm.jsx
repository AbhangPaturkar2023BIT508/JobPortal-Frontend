import {
  Button,
  FileInput,
  LoadingOverlay,
  Notification,
  NumberInput,
  rem,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import {
  successNotification,
  errorNotification,
} from "../../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [second, setSecond] = useState(5);
  const navigate = useNavigate();
  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let resume = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      applicantId: user.id,
      resume: resume.split(",")[1],
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        successNotification("Success", "Application Submitted Successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        setSubmit(false);
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });

    // let x = 5;
    // setInterval(() => {
    //   x--;
    //   setSecond(x);
    //   if (x === 0) {
    //     navigate("/find-jobs");
    //   }
    // }, 1000);
  };
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is requried"),
      website: isNotEmpty("Website is required"),
      resume: isNotEmpty("Resume is required"),
    },
  });
  return (
    <>
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            label="Full Name"
            placeholder="Enter name"
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            label="Email"
            placeholder="Enter email"
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            label="Phone Number"
            placeholder="Enter Phone Number"
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
          />
          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            label="Personal Website"
            placeholder="Enter Url"
          />
        </div>
        <FileInput
          {...form.getInputProps("resume")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV"
          placeholder="Attach Resume/CV"
          leftSectionPointerEvents="none"
          accept="application/pdf"
        />
        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          //   withAsterisk
          placeholder="Type something aobut yourself..."
          label="Cover Letter"
          autosize
          minRows={2}
        />
        {!preview && (
          <Button onClick={handlePreview} color="brightSun.4" variant="light">
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*]:!w-1/2">
            <Button
              fullWidth
              onClick={handlePreview}
              color="brightSun.4"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="brightSun.4"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      {/* <Notification
        className={`!border-bright-sun-400 -translate-y-20 !fixed top-0 left-[40%] z-[1001] transition duration-300 ease-in-out ${
          submit ? "translate-y-0" : ""
        }`}
        icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
        color="teal"
        title="Application Submitted!"
        mt="md"
        withCloseButton={false}
        withBorder
      >
        Redirecting to Find Jobs in {second} seconds...
      </Notification> */}
    </>
  );
};
export default ApplicationForm;
