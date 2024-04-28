import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch"; // Adjust the import path as necessary
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Input from "../components/Input";

const Login = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); // State to hold the selected user type
  const navigate = useNavigate();

  const handleLogin = async () => {
    const body = {
      email,
      password,
      userType, // Include userType in the request body
    };

    const res = await fetchData("/auth/login", "POST", body);

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access); // Decode access token to get your claims
      console.log(decoded); // Log decoded token to console

      // userCtx.setUserType(userType); // Set user type based on the selection
      userCtx.setRole(decoded.role); // Assuming the decoded token contains a 'role' property
      // Redirect or perform other actions after successful login
      navigate("/campaigns");
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  return (
    <div>
      <DropDown
        labelId="usertype-select-label"
        label="User Type"
        value={userType}
        options={["user", "brand"]}
        onChange={(e) => setUserType(e.target.value)}
      ></DropDown>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
