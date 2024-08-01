import React from "react";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../context/user";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(UserContext);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
      window.localStorage.setItem("access", data.access);
      window.localStorage.setItem("refresh", data.refresh);
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setType(decoded.type);
      userCtx.setUsername(decoded.username);
    }
  }, [data]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Reset errors
    setErrors({
      email: "",
      password: "",
    });

    let isValid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required!";
      isValid = false;
    } else if (!email.includes("@")) {
      newErrors.email = "Email must be a valid email!";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long!";
      isValid = false;
    }

    if (isValid) {
      refetch();
    } else {
      setErrors(newErrors);
    }
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
            className="col-md-4"
          >
            {errors.email}
          </div>
        )}
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
            className="col-md-4"
          >
            {errors.password}
          </div>
        )}
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
            onClick={handleSubmit}
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
