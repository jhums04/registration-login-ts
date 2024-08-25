import React from "react";
import { Navigate } from "react-router-dom";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Welcome back!</h1>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Home;
