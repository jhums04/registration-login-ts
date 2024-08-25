import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Registration from "./components/Registration/Registration";

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const PrivateRoute = () => {
    if (isLoggedIn) {
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  useEffect(() => {
    let jwt = localStorage.getItem("jwtToken");
    if (jwt == null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route
          path="/login"
          element={<Login isLoggedIn={isLoggedIn} setLogin={setLoggedIn} />}
        />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/register"
          element={
            <Registration setLogin={setLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
