import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch"; // Adjust the import path as necessary
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import honesthues from "../images/honesthues.png";

const Login = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
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
      userCtx.setRole(decoded.role); // Assuming the decoded token contains a 'role' property
      userCtx.setUserId(decoded.id);
      userCtx.setEmail(decoded.email);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (userCtx.role === "user") {
      navigate("/campaigns");
    } else if (userCtx.role === "brand") {
      navigate("/campaigns/create");
    }
  }, [userCtx.accessToken]);

  return (
    <>
      <br />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="600px"
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            // margin="16px"
            width="500px"
          >
            <img className="banner" src={honesthues} alt="honesthues" />
            <DropDown
              labelId="usertype-select-label"
              label="User Type"
              value={userType}
              options={["user", "brand"]}
              onChange={(e) => setUserType(e.target.value)}
              fullWidth
            ></DropDown>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            ></Input>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            ></Input>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Login
            </Button>
            <Link to="/register">
              <Button sx={{ color: "#CA7DF9" }} variant="text" fullWidth>
                Don’t have an account? Register
              </Button>
              <br></br>
            </Link>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Login;
