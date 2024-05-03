import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import honesthueslogo from "../images/honesthueslogo.png";
import { Box } from "@mui/material";

const Navbar = () => {
  const userCtx = useContext(UserContext);

  const handleLogout = () => {
    userCtx.logout(); // Call the logout function from UserContext
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #e2a0ff 30%, #c4f5fc 90%)",
        boxShadow: "none",
        height: "110%",
      }}
    >
      <Toolbar>
        <Box>
          <img
            src={honesthueslogo}
            alt="Logo"
            style={{ height: "60px" }}
            margin="24px"
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {userCtx.role !== "brand" && (
          <Button color="inherit" component={Link} to="/campaigns">
            Campaigns
          </Button>
        )}
        {userCtx.role !== "brand" && (
          <Button color="inherit" component={Link} to="/reviews">
            reviews
          </Button>
        )}
        {userCtx.role === "brand" && (
          <Button color="inherit" component={Link} to="/campaigns/create">
            Create Campaign
          </Button>
        )}
        {userCtx.role !== "brand" && (
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
