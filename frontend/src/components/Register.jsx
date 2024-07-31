import React from "react";
import UseFetchNT from "../hooks/useFetchNT";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Register = (props) => {
  const usingFetch = UseFetchNT();
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPW: "",
    username: "",
    type: "",
  });

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["reg"],
    queryFn: async () => await usingFetch("/types"),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await usingFetch("/auth/regPg", "PUT", {
        type,
        username,
        password,
        email,
      });
    },
    onSuccess: () => props.setShowLogin(true),
  });

  const handleSubmit = () => {
    // Reset errors
    setErrors({
      email: "",
      password: "",
      confirmPW: "",
      username: "",
      type: "",
    });

    let isValid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required!";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long!";
      isValid = false;
    }

    if (password !== confirmPW) {
      newErrors.confirmPW = "Passwords do not match!";
      isValid = false;
    } else if (confirmPW.length > 0 && confirmPW.length < 8) {
      newErrors.confirmPW =
        "Confirming Password must be at least 8 characters long!";
      isValid = false;
    }

    if (!username) {
      newErrors.username = "Username is required!";
      isValid = false;
    }

    if (type === "none") {
      newErrors.type = "Type is required!";
      isValid = false;
    }

    if (isValid) {
      mutate();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          type="text"
          required={email.toString()}
          className="col-sm-3"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors.email && (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            className="col-sm-3"
          >
            {errors.email}
          </div>
        )}
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          type="text"
          required={password.toString()}
          className="col-sm-3"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {errors.password && (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            className="col-sm-3"
          >
            {errors.password}
          </div>
        )}
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          type="text"
          require={password.toString()}
          className="col-sm-3"
          placeholder="confirm password"
          value={confirmPW}
          onChange={(e) => {
            setConfirmPW(e.target.value);
          }}
        />
        {errors.confirmPW && (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            className="col-sm-3"
          >
            {errors.confirmPW}
          </div>
        )}
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          type="text"
          required={password.toString()}
          className="col-sm-3"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {errors.username && (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            className="col-sm-3"
          >
            {errors.username}
          </div>
        )}
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <select
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          name="type"
          required={password.toString()}
          id="types"
          className="col-sm-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="none">Select Type</option>
          {data &&
            data.x.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
        {errors.type && (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              textAlign: "center",
            }}
            className="col-sm-3"
          >
            {errors.type}
          </div>
        )}
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-1"></div>
        {/* Conditionally render based on password match */}
        {password === confirmPW ? (
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
            }}
            className="col-sm-3"
            onClick={() => {
              handleSubmit();
            }}
          >
            Register
          </button>
        ) : (
          <div
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "#FF474C",
              color: "white",
            }}
            className="col-sm-3"
          >
            Passwords do not match!
          </div>
        )}
      </div>
      <div className="col-sm-1"></div>

      <div className="row">
        <div className="col-sm-1"></div>
        <button
          style={{
            padding: "5px",
            borderRadius: "15px",
            gap: "1px",
            backgroundColor: "black",
            color: "rgb(49, 238, 49)",
          }}
          className="col-sm-3"
          onClick={() => props.setShowLogin(true)}
        >
          Go to Login
        </button>
        <div className="col-sm-1"></div>
      </div>
    </>
  );
};

export default Register;
