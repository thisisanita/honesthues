import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";

const ProductDetail = () => {
  const { campaignId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState("");
  // const [details, setDetails] = useState("");
  // const [picture, setPicture] = useState("");
  // const [recommendation, setRecommendation] = useState("");
  const userCtx = useContext(UserContext);
  const userEmail = userCtx.email;
  console.log(userCtx.email);
  const userId = userCtx.userId;
  console.log(userId);
  const fetchData = useFetch();
  const [showReviewModal, setShowReviewModal] = useState(false);
  //   const [editingCampaign, setEditingCampaign] = useState(null);

  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  // console.log(campaignDetails.campaign_name);
  const getProductDetails = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/detail",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging
      if (res.ok) {
        setProductDetails(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
        console.log(res.data);
      } else {
        console.error("Error fetching campaigns:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };
  // const createReview = async () => {
  //   try {
  //     const res = await fetchData(
  //       "/api/reviews/create",
  //       "POST",
  //       {
  //         campaignId: campaignId,
  //         userId: userId,
  //         rating: rating,
  //         details: details,
  //         picture: picture,
  //         review_recommendation: recommendation,
  //       },
  //       userCtx.accessToken
  //     );

  //     if (res.ok) {
  //       console.log("Successfully created review");
  //     } else {
  //       console.error("Error submitting review:", res.status, res.statusText);
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //     console.log(error);
  //   }
  // };
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
        console.log("Successfully gotten review");
        setReviews(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
        console.log(res.data);
      } else {
        console.error("Error fetching campaigns:", res.status, res.statusText);
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
      <h1>{productDetails.product_name}</h1>
      <h5>
        <img src={productDetails.product_picture} alt="Product Picture" />
      </h5>
      <h1>{productDetails.product_description}</h1>
      <h1>{productDetails.product_shades}</h1>
      <h1>{productDetails.product_ingredients}</h1>
      <h1>{productDetails.product_instructions}</h1>
      <Button onClick={toggleReviewModal}>Create Review</Button>
      {reviews.map((review, idx) => {
        return (
          <ReviewCard
            index={review.idx}
            key={review.id}
            id={review.id}
            timestamp={review.timestamp}
            rating={review.rating}
            details={review.details}
            picture={review.picture}
            recommendation={review.review_recommendation}
          ></ReviewCard>
        );
      })}
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
