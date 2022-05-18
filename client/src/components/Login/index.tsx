import "./index.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../graphql/mutations";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem("auth-token", login.token);
      localStorage.setItem("email", login.user.email);
      navigate("/listitems");
      window.location.reload();
    },
  });

  const [register, data] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: () => {
      console.log(data);
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (formState.login) {
      login();
    } else {
      register();
    }
  };

  return (
    <div className="frame__inner">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          className="email"
          placeholder="Email"
          autoFocus
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          className="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" className="submit">
          {formState.login ? "Sign in" : "Sign up"}
        </button>
        <button
          className=""
          style={{ marginTop: "1rem", background: "transparent" }}
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
          type="button"
        >
          {formState.login
            ? "Need to create an account?"
            : "Already have an account?"}
        </button>
      </form>
    </div>
  );
};

export default Login;
