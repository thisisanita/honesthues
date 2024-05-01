import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";

const ReviewCard = (props) => {
  const isoDateTime = props.timestamp;

  const date = new Date(isoDateTime);

  // Format the date and time
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true, // Optional: includes the time zone
  });

  return (
    <div>
      <h2>{props.title}</h2>
      <h2>{props.details}</h2>
      <img src={props.picture} alt="Review Picture" />
      <h4>{props.rating}</h4>
      <h4>{props.recommendation}</h4>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ReviewCard;
