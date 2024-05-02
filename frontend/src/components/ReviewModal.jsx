import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Stack } from "@mui/material";

const ReviewModal = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [details, setDetails] = useState("");
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [recommendation, setRecommendation] = useState(false);
  const userId = userCtx.userId;
  const reviewUploadRef = useRef(null);
  const [userDetails, setUserDetails] = useState({});

  const handleRecommendedToggle = (event, newRecommend) => {
    setRecommendation(newRecommend);
    // Here you can handle the user's choice, for example, sending it to a server
    console.log("User would recommend the product:", newRecommend);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    // Here you can handle the user's rating, for example, sending it to a server
    console.log("User rated the product:", newValue);
  };

  const handleCreateReview = async () => {
    await createReview();
    await props.getReviews();
    props.toggleReviewModal();
  };

  const createReview = async () => {
    try {
      const res = await fetchData(
        "/api/reviews/create",
        "POST",
        {
          campaignId: props.campaignId,
          userId: userId,
          title: title,
          rating: rating,
          details: details,
          picture: picture,
          review_recommendation: recommendation,
        },
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("Successfully created review");
        console.log(res.data);
      } else {
        console.error("Error submitting review:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };
  useEffect(() => {
    if (!reviewUploadRef.current) {
      const cloudinaryWidgetProduct = window.cloudinary.createUploadWidget(
        {
          cloudName: "dttapcv2c",
          uploadPreset: "xmooqktl",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setPicture(result.info.secure_url);
          }
        }
      );

      const uploadButton = document.getElementById("upload_review_widget");
      uploadButton.addEventListener(
        "click",
        () => {
          cloudinaryWidgetProduct.open();
        },
        false
      );

      reviewUploadRef.current = uploadButton;
    }
  }, []);

  return (
    <div className="overlay">
      <div className="createcampaignmodal">
        <h2>Create Review</h2>
        <Stack direction="column" spacing={2}>
          <Input
            label="Review Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          ></Input>

          <Input
            label="Details"
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
          ></Input>
          <Stack direction="row" spacing={2}>
            <Input
              label="Review Picture"
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              fullWidth
            ></Input>
            <Button
              sx={{
                borderRadius: "20px",
                letterSpacing: "3px",
                padding: "8px",
                color: "#CA7DF9",
                fontWeight: "bold",
              }}
              variant="outlined"
              id="upload_review_widget"
              className="cloudinary-button"
            >
              Upload Picture
            </Button>
          </Stack>
          <FormControl component="fieldset">
            <FormLabel component="legend">Rate this product</FormLabel>
            <Rating
              name="product-rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5} // Allows for half-star ratings
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Would you recommend this product?
            </FormLabel>
            <ToggleButtonGroup
              color="primary"
              value={recommendation}
              exclusive
              onChange={handleRecommendedToggle}
            >
              <ToggleButton value={true} aria-label="recommend">
                Recommend
              </ToggleButton>
              <ToggleButton value={false} aria-label="not recommend">
                Not Recommend
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <Button onClick={handleCreateReview}>Create Review</Button>
        </Stack>
      </div>
    </div>
  );
};

export default ReviewModal;
