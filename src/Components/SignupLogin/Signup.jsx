import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const Signup = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState(form);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });

    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords do not match.";
      setFormError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setFormError({ ...formError, [name]: "Passwords do not match." });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
      }
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match.";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid === true) {
      setLoading(true);
      registerUser(data)
        .then((res) => {
          // console.log(res);
          setData(form);
          successNotification(
            "Registered Successfully",
            "Redirecting to login page..."
          );

          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          // console.log(err);
          setLoading(false);
          errorNotification(
            "Registration Failed",
            err.response.data.errorMessage
          );
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={Loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 sm-mx:py-20 sm-mx:w-full bs-mx:px-10 md-mx:px-5  flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
          value={data.name}
          error={formError.name}
          onChange={handleChange}
          name="name"
          withAsterisk
          label="Full Name"
          placeholder="Your name"
        />
        <TextInput
          value={data.email}
          error={formError.email}
          onChange={handleChange}
          name="email"
          withAsterisk
          leftSection={
            <IconAt style={{ width: rem(18), height: rem(16) }} stroke={1.5} />
          }
          label="Email"
          placeholder="Your Email"
        />
        <PasswordInput
          value={data.password}
          error={formError.password}
          name="password"
          onChange={handleChange}
          withAsterisk
          leftSection={
            <IconLock
              style={{ widht: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Password"
          placeholder="Password"
        />
        <PasswordInput
          name="confirmPassword"
          error={formError.confirmPassword}
          value={data.confirmPassword}
          onChange={handleChange}
          withAsterisk
          leftSection={
            <IconLock
              style={{ widht: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Confirm Password"
          placeholder="Confirm Password"
        />
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You are ?"
          withAsterisk
        >
          <div className="flex gap-6 xs-mx:gap-3">
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
              // autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 sm-mx:px-4 sm-mx:py-2 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg"
              // autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </div>
        </Radio.Group>

        <Checkbox
          // autoContrast
          label={
            <>
              I accept <Anchor>terms & conditions</Anchor>
            </>
          }
        />
        <Button
          loading={Loading}
          onClick={handleSubmit}
          // autoContrast
          variant="filled"
        >
          Sign up
        </Button>
        <div className="mx-auto text-center sm-mx:text-sm xs-mx:text-xs">
          Have an account?
          <span
            onClick={() => {
              navigate("/login");
              setData(form);
              setFormError(form);
            }}
            className="text-bright-sun-400 hover:underline pl-1 cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
