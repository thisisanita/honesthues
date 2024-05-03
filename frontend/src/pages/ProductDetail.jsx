import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";
import star_solid from "../images/star_solid.png";
import star_half from "../images/star_half.png";
import star_empty from "../images/star_empty.png";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";

const ProductDetail = () => {
  const { campaignId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const userCtx = useContext(UserContext);
  const userEmail = userCtx.email;
  console.log(userCtx.email);
  const userId = userCtx.userId;
  console.log(userId);
  const fetchData = useFetch();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleCreateReview = () => {
    addCreditsToWallet();
    toggleReviewModal();
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<img className="rating" src={star_solid} alt="Full Star" />);
      } else if (i < Math.ceil(rating)) {
        stars.push(<img className="rating" src={star_half} alt="Half Star" />);
      } else {
        stars.push(
          <img className="rating" src={star_empty} alt="Empty Star" />
        );
      }
    }
    return stars;
  };

  const getProductDetails = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/detail",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setProductDetails(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
      } else {
        console.error("Error fetching campaigns:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const res = await fetchData(
        "/api/reviews/" + campaignId,
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging
      if (res.ok) {
        console.log("Successfully gotten reviews");
        setReviews(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
      } else {
        console.error("Error fetching reviews:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const addCreditsToWallet = async () => {
    try {
      const res = await fetchData(
        "/api/user/wallet",
        "PATCH",
        {
          email: userEmail,
          operation: "add",
          amount: 30,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Successfully added credits");
      } else {
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
    getReviews();
  }, []);

  return (
    <div>
      <Box>
        <Stack
          direction="column"
          // justifyContent="center"
          // alignItems="center"
          spacing={2}
          margin="16px"
          width="90%"
        >
          <h1>{productDetails.product_name}</h1>
          <h5>
            <img
              className="campaignpicture"
              src={productDetails.product_picture}
              alt="Product Picture"
            />
          </h5>
          <p>{productDetails.product_description}</p>
          <p>Shades: {productDetails.product_shades}</p>
          <p>Instructions: {productDetails.product_instructions}</p>
          <h6>Ingredients: {productDetails.product_ingredients}</h6>
          <Button onClick={handleCreateReview}>Create Review</Button>
        </Stack>
        <br></br>
        {reviews.map((review, idx) => {
          return (
            <ReviewCard
              index={review.idx}
              key={review.id}
              id={review.id}
              timestamp={review.timestamp}
              rating={renderStars(review.rating)}
              details={review.details}
              picture={review.picture}
              recommendation={
                review.review_recommendation
                  ? "I recommended this product!"
                  : "I do not recommended this product!"
              }
              title={review.title}
              skinType={review.skin_type}
              skinTone={review.skin_tone}
              ageGroup={review.age_group}
              hairColour={review.hair_colour}
              eyeColour={review.eye_colour}
              name={review.name}
            ></ReviewCard>
          );
        })}
      </Box>
      {showReviewModal && (
        <ReviewModal
          getReviews={getReviews}
          campaignId={productDetails.id}
          toggleReviewModal={toggleReviewModal}
        />
      )}
    </div>
  );
};
export default ProductDetail;
