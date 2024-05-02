import React, { useEffect, useState, useContext, useRef } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";

const ReviewCard = (props) => {
  const isoDateTime = props.timestamp;

  const date = new Date(isoDateTime);

  // Format the date and time
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box className="reviews">
      <Stack direction="row" spacing={2} width="100%">
        <Stack direction="column" spacing={2} width="100%">
          <h3>{props.title}</h3>
          <h4>{props.details}</h4>
          <img
            className="reviewpicture"
            src={props.picture}
            alt="Review Picture"
          />
        </Stack>
        <Stack direction="column" spacing={2} width="30%">
          <h4>{props.name}</h4>
          <h5>
            Skin Tone: {props.skinTone}, Skin Type: {props.skinType}, Hair
            Colour:
            {props.hairColour}, Eye Colour: {props.eyeColour}
          </h5>
          <h4>{props.rating}</h4>
          <h5>{props.recommendation}</h5>
        </Stack>
      </Stack>
      <h5>Posted on {formattedDate}</h5>
    </Box>
  );
};

export default ReviewCard;
