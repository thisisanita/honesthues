import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

const DropDown = ({
  label = "",
  labelId = "",
  value = "",
  onChange = () => {},
  options = [],
  ...props
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={label}
        value={value}
        label={label}
        onChange={onChange}
        {...props} // Spread props for additional flexibility
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropDown;
