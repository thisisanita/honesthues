import React, { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Campaigns from "./pages/Campaigns";
import Homepage from "./pages/Homepage";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  // const [userType, setUserType] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // const userCtx = useContext(UserContext);

  // // Simulate fetching user type and access token from storage or API
  // useEffect(() => {
  //   // Example: Fetching user type and access token from local storage
  //   const storedUserType = localStorage.getItem("userType");
  //   const storedAccessToken = localStorage.getItem("accessToken");

  //   if (storedUserType) {
  //     setUserType(storedUserType);
  //   }
  //   if (storedAccessToken) {
  //     setAccessToken(storedAccessToken);
  //   }
  // }, []);

  // Redirect logic based on access token and user type
  if (accessToken.length > 0) {
    if (role === "brand") {
      return <Navigate to="/brand-site" />;
    } else if (role === "user") {
      return <Navigate to="/campaigns" />;
    }
  }

  // If there's no access token or user type, redirect to the login page
  return (
    <UserContext.Provider
      value={{ accessToken, setAccessToken, role, setRole, email, setEmail }}
    >
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />}></Route>
        <Route path="homepage" element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Registration />}></Route>
        <Route path="campaigns" element={<Campaigns />}></Route>
        <Route path="reviews" element={<Reviews />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        {/* <Route path="*" element={<NotFound />}></Route> */}
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/login" />} />
        {/* Default route */}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
