import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/campaigns">
          Campaigns
        </Button>
        <Button color="inherit" component={Link} to="/reviews">
          reviews
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
