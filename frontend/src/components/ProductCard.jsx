import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "./Button";
import CampaignDetail from "../pages/CampaignDetail";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

const ProductCard = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const campaignId = props.id;
  const navigateToProductDetail = (campaignId) => {
    console.log("Navigating to product detail:", campaignId);
    navigate("/products/" + campaignId);
  };

  const getAllProducts = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        setProducts(res.data);
        JSON.stringify(res.data);
        console.log(res.data);
      } else {
        console.error("Error fetching products:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "400px", // Adjust the width as needed
          height: "100%",
          margin: "auto", // Center the card
        }}
      >
        <CardHeader title={props.productName} subheader={props.brandName} />
        <CardMedia
          component="img"
          height="30%"
          // width="100%"
          image={props.productPicture}
          alt="Campaign Banner"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Reviews
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.productDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigateToProductDetail(campaignId)}>
            More Details
          </Button>
        </CardActions>
      </Card>

      {/* <h2>{props.productName}</h2>
      <h2>{props.productDescription}</h2>
      <p>{props.productShades}</p>
      <h5>{props.productShadesPicture}</h5>
      <p>{props.productInstructions}</p>
      <h3>{props.brandName}</h3> */}
      {/* <h3>{totalCampaignRequests.totalRequests}</h3> */}
      {/* <CampaignDetail
        totalCampaignRequests={totalCampaignRequests}
      ></CampaignDetail> */}
    </>
  );
};

export default ProductCard;
