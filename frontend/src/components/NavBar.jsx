import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
