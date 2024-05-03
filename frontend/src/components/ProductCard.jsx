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
  const [productStats, setProductStats] = useState({});
  const navigateToProductDetail = (campaignId) => {
    console.log("Navigating to product detail:", campaignId);
    navigate("/products/" + campaignId);
  };
  const averageRating = Math.round(productStats.averageRating * 100) / 100;
  const getProductStats = async () => {
    try {
      const res = await fetchData(
        "/api/reviews/stats/" + campaignId,
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setProductStats(res.data);
        JSON.stringify(res.data);
        console.log(res.data);
      } else {
        console.error(
          "Error fetching product stats:",
          res.status,
          res.statusText
        );
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  useEffect(() => {
    getProductStats();
  }, [campaignId]);

  return (
    <div>
      <Card
        sx={{
          width: "500px", // Adjust the width as needed
          height: "100%",
          margin: "auto", // Center the card
          borderRadius: "10px",
          border: "16px",
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
          <Typography variant="h6" color="text.secondary">
            Average Product Rating: {averageRating}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Total Reviews: {productStats.totalReviews}
          </Typography>
          <br></br>
          <Typography variant="body1" color="text.secondary">
            {props.productDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              borderRadius: "20px",
              letterSpacing: "3px",
              padding: "8px",
              color: "white",
              fontWeight: "bold",
              margin: "16px",
            }}
            fullWidth
            onClick={() => navigateToProductDetail(campaignId)}
          >
            More Details
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
