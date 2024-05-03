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
import UpdateCampaignModal from "./UpdateCampaignModal";

const CampaignCard = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const campaignId = props.id;
  const navigateToCampaignDetail = (campaignId) => {
    console.log("Navigating to campaign detail:", campaignId);
    navigate("/campaigns/" + campaignId);
  };

  const [showUpdateCampaignModal, setShowUpdateCampaignModal] = useState(false);

  const toggleUpdateCampaignModal = () => {
    setShowUpdateCampaignModal(!showUpdateCampaignModal);
  };

  const deleteCampaign = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/delete",
        "DELETE",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Successfully deleted request");
      } else {
        alert(
          "Campaign cannot be deleted because reviews have already been submitted for this campaign and its linked product."
        );
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const handleRequestDelete = async () => {
    await deleteCampaign();
    await props.getBrandCampaigns();
  };

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
        <CardHeader title={props.campaignName} subheader={props.brandName} />
        <CardMedia
          component="img"
          height="30%"
          // width="100%"
          image={props.campaignPicture}
          alt="Campaign Banner"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Total samples: {props.campaignRequests}
          </Typography>
          <br />
          <Typography variant="body1" color="text.secondary">
            Credit: {props.campaignCredit}
          </Typography>
          <br />
          <Typography variant="body1" color="text.secondary">
            {props.campaignDescription}{" "}
          </Typography>
        </CardContent>
        <CardActions>
          {userCtx.role === "user" && (
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
              onClick={() => navigateToCampaignDetail(campaignId)}
            >
              More Details
            </Button>
          )}
          {userCtx.role === "brand" && (
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
              onClick={handleRequestDelete}
            >
              Delete
            </Button>
          )}
          {userCtx.role === "brand" && (
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
              onClick={toggleUpdateCampaignModal}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
      {userCtx.role === "brand" && showUpdateCampaignModal && (
        <UpdateCampaignModal
          campaignId={props.id}
          toggleUpdateCampaignModal={toggleUpdateCampaignModal}
          getBrandCampaigns={props.getBrandCampaigns}
        ></UpdateCampaignModal>
      )}
    </div>
  );
};

export default CampaignCard;
