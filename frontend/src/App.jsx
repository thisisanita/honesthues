import React, { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import UserContext from "./context/user";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import CreateCampaign from "./pages/CreateCampaign";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "./index.css";

function App() {
  const [accessToken, setAccessToken] = useState("");
  // const [userType, setUserType] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const login = (id, role) => {
    if (role === "user") {
      setUserId(id);
    } else if (role === "brand") {
      setBrandId(id);
    }
    // Additional logic for login, such as setting tokens or redirecting
  };

  const logout = () => {
    setUserId(null);
    setBrandId(null);
    setRole("");
    setAccessToken("");
    setEmail("");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          email,
          setEmail,
          userId,
          setUserId,
          brandId,
          setBrandId,
          login,
          logout,
        }}
      >
        {/* {accessToken.length > 0 && <Navigate to="/campaigns"></Navigate>} */}
        {userId || accessToken.length > 0 ? <NavBar /> : null}
        <Routes>
          <Route path="/campaigns" element={<Campaigns />}></Route>
          {/* <Route path="/create" element={<CreateCampaign />}></Route> */}
          <Route
            path="/campaigns/:campaignId"
            element={<CampaignDetail />}
          ></Route>
          <Route
            path="/products/:campaignId"
            element={<ProductDetail />}
          ></Route>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="homepage" element={<Homepage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Registration />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route
            path="campaigns/create"
            element={
              role === "brand" ? <CreateCampaign /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
          {/* <Route path="*" element={<NotFound />}></Route> */}
          {/* Add other routes as needed */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          {/* Default route */}
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
