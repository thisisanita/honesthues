import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "./Button";
import CampaignDetail from "../pages/CampaignDetail";

const ProductCard = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const campaignId = props.id;
  const navigateToProductDetail = (campaignId) => {
    console.log("Navigating to product detail:", campaignId);
    navigate("/products/" + campaignId);
  };

  return (
    <div>
      <h2>{props.productName}</h2>
      <h2>{props.productDescription}</h2>
      <p>{props.productShades}</p>
      <h5>{props.productShadesPicture}</h5>
      <p>{props.productInstructions}</p>
      <h3>{props.brandName}</h3>
      {/* <h3>{totalCampaignRequests.totalRequests}</h3> */}
      {/* <CampaignDetail
        totalCampaignRequests={totalCampaignRequests}
      ></CampaignDetail> */}
      <Button onClick={() => navigateToProductDetail(campaignId)}>
        More Details
      </Button>
    </div>
  );
};

export default ProductCard;
