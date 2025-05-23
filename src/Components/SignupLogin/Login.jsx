import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/AuthService";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import { jwtDecode } from "jwt-decode";

import { setJwt } from "../../Slices/JwtSlice";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          // console.log(res);
          successNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          console.log(decoded);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          errorNotification("Login Failed", err.response?.data?.errorMessage);
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={Loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login</div>
        <TextInput
          value={data.email}
          error={formError.email}
          name="email"
          onChange={handleChange}
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
        <Button
          loading={Loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't Have an account?
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
            }}
            className="text-bright-sun-400 hover:underline pl-1"
          >
            SignUp
          </span>
        </div>
        <div
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
          onClick={open}
        >
          Forget Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
