import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";

const ReviewCard = (props) => {
  return (
    <div>
      <h2>{props.details}</h2>
    </div>
  );
};

export default ReviewCard;
