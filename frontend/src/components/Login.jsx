import React from "react";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/logPg", "POST", { email, password });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setType(decoded.type);
      userCtx.setUsername(decoded.username);
    }
  }, [data]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 position-relative">
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              width: "100%",
            }}
            type="text"
            className="col-md-4"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 position-relative">
          <input
            style={{
              padding: "5px",
              borderRadius: "15px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              width: "100%",
            }}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "rgb(49, 238, 49)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "🙉"}
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 position-relative">
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              width: "100%",
            }}
            className="col-md-4"
            onClick={refetch}
          >
            Login
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 position-relative">
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "black",
              color: "rgb(49, 238, 49)",
              width: "100%",
            }}
            className="col-md-4"
            onClick={() => props.setShowLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Login;
