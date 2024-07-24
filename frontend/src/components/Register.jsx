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

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["reg"],
    queryFn: async () => await usingFetch("/type"),
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

  return (
    <>
      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "10px",
            borderRadius: "25px",
            gap: "2px",
            backgroundColor: "teal",
            color: "white",
          }}
          type="text"
          className="col-sm-3"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "teal",
            color: "white",
          }}
          type="text"
          className="col-sm-3"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "green",
            color: "white",
          }}
          type="text"
          className="col-sm-3"
          placeholder="confirm password"
          value={confirmPW}
          onChange={(e) => {
            setConfirmPW(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <input
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "blue",
            color: "white",
          }}
          type="text"
          className="col-sm-3"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div className="col-sm-1"></div>
      </div>

      <div className="row">
        <div className="col-sm-1"></div>
        <select
          style={{
            padding: "5px",
            borderRadius: "30px",
            gap: "2px",
            backgroundColor: "cyan",
            color: "black",
          }}
          name="type"
          id="types"
          className="col-sm-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="none">Select Type</option>
          {data &&
            data.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-1"></div>
        {/* Conditionally render based on password match */}
        {password === confirmPW ? (
          <button
            style={{
              padding: "10px",
              borderRadius: "35px",
              gap: "3px",
              backgroundColor: "red",
              color: "black",
            }}
            className="col-sm-3"
            onClick={() => {
              mutate();
              props.setShowLogin(true);
            }}
          >
            Register
          </button>
        ) : (
          <div style={{ color: "yellow" }} className="col-sm-3">
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
            borderRadius: "30px",
            gap: "3px",
            backgroundColor: "blue",
            color: "black",
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
