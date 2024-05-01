import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Input = ({
  label = "",
  value = "",
  onChange = () => {},
  type = "text",
  ...props
}) => {
  return (
    <TextField
      sx={{
        "&.MuiInputBase-input": {
          backgroundColor: "black", // Change the background color of the input box
        },
      }}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default Input;
