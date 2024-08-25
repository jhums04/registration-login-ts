import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

interface LoginProps {
  setLogin: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ isLoggedIn, setLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      console.log("Submitted");
      console.log(username);
      console.log(password);
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      const token = response.data.token;
      if (token !== null) {
        localStorage.setItem("jwtToken", token);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      const invalid = document.getElementById("invalid__container__id");
      invalid?.setAttribute("style", "display: flex");
      console.error("Login failed", error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="main__login__container">
      <div className="login__container">
        <h1>LOGIN</h1>
        <div className="invalid__container" id="invalid__container__id">
          <img src="/x-invalid.png" alt="x-invalid" className="invalid__png" />
          <p>Incorrect Username or Password</p>
        </div>
        <form>
          <div className="main__input__container">
            <div className="sub__input__container">
              <div className="input__container">
                <img src="/person.png" alt="Person" className="form__png" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="input__fields"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <hr />
            </div>
            <div className="sub__input__container">
              <div className="input__container">
                <img src="/password.png" alt="Person" className="form__png" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input__fields"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <hr />
            </div>
          </div>

          <div className="forgot__password__container">
            {/* eslint-disable-next-line */}
            <a target="/">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="submit__btn"
            onClick={(e) => handleSubmit(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            LOGIN
          </button>

          <div className="not_a_member__container">
            <p>
              Not a member?{" "}
              <span>
                {/* eslint-disable-next-line */}
                <a target="/">Register now</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
