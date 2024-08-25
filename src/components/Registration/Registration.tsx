import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="registration__main__container">
      <div className="registration__form__container">
        <h1>SIGNUP</h1>
        <form>
          <div className="registration_main__input__container">
            <div className="registration__input__container">
              <div className="fullname__container">
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
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
                  <select name="role">
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <hr />
                </div>
              </div>

              <div className="input__container__registration">
                <button type="submit">SUBMIT</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
