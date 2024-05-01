import React from "react";
import MuiButton from "@mui/material/Button";
import PropTypes from "prop-types";

const Button = ({
  variant = "contained",
  color = "primary",

  type = "button",
  onClick,
  children,
  ...props
}) => {
  return (
    <MuiButton
      sx={{
        borderRadius: "20px",
        letterSpacing: "3px",
        padding: "8px",
        color: "white",
        fontWeight: "bold",
      }}
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
