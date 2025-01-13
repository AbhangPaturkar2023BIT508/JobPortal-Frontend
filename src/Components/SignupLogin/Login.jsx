import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../Services/UserService";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(form);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    loginUser(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput
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
        name="password"
        onChange={handleChange}
        withAsterisk
        leftSection={
          <IconLock style={{ widht: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label="Password"
        placeholder="Password"
      />
      <Button onClick={handleSubmit} autoContrast variant="filled">
        Sign in
      </Button>
      <div className="mx-auto">
        Don't Have an account?
        <Link to="/signup" className="text-bright-sun-400 hover:underline pl-1">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
