import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface RegistrationProps {
  setLogin: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
}
const Registration: React.FC<RegistrationProps> = ({
  isLoggedIn,
  setLogin,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const formDiv = document.getElementById(
      "registration__form__container__id"
    );
    formDiv?.setAttribute("style", "display: none");
    try {
      const response = await axios.post("http://localhost:8080/register", {
        firstName,
        lastName,
        email,
        username,
        password,
        role,
      });

      if (response.data != null) {
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setUserName("");
        setPassword("");
        setRole("USER");
      }

      const loadingScreenHeader = document.getElementById(
        "loading__screen__h2"
      );

      if (loadingScreenHeader != null) {
        console.log("loadingScreenHeader ", loadingScreenHeader);
        loadingScreenHeader.textContent =
          "Please activate your account via email. Redirecting to homepage...";
      }

      setTimeout(() => {
        setLoading(false);
        setRedirect(true);
      }, 10000);
    } catch (error) {
      const loadingScreenHeader = document.getElementById(
        "loading__screen__h2"
      );

      if (loadingScreenHeader != null) {
        loadingScreenHeader.textContent =
          "Something went wrong. Please try again later.";
      }
      setTimeout(() => {
        console.log("before navigate");
        navigate("/");
      }, 5000);
    }
  };

  return (
    <div
      className="registration__main__container"
      id="registration__main__container__id"
    >
      {loading && (
        <div className="loading__screen">
          <h2 id="loading__screen__h2">Submitting Registration</h2>
          <div className="custom-loader"></div>
        </div>
      )}
      <div
        className="registration__form__container"
        id="registration__form__container__id"
      >
        <h1>SIGNUP</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="registration_main__input__container">
            <div className="registration__input__container">
              <div className="fullname__container">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="input__fields input__fields__fullname"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <hr />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="input__fields"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <hr />
                </div>
              </div>
              <div className="input__container__registration">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input__fields"
                    placeholder="Email Address"
                    value={email}
                    onChange={(event) => setEmailAddress(event.target.value)}
                  />
                  <hr />
                </div>
              </div>
              <div className="input__container__registration">
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="input__fields"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                  <hr />
                </div>
              </div>

              <div className="input__container__registration">
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input__fields"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <hr />
                </div>
              </div>

              <div className="input__container__registration">
                <div>
                  <select
                    name="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <hr />
                </div>
              </div>

              <div className="input__container__registration">
                <button type="submit" onSubmit={handleSubmit}>
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="member__login__container">
          <p>
            Already A Member?
            <span>
              <Link to="/login">Login Now</Link>
            </span>
          </p>
        </div>
      </div>
      {redirect && <Navigate to="/login" />}
    </div>
  );
};

export default Registration;
