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
  // console.log(campaignId);
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

  // const updateCampaign = async () => {
  //   try {
  //     const res = await fetchData(
  //       "/api/campaigns/",
  //       "PATCH",
  //       {
  //         id: campaignId,
  //         campaign_name: campaignName,
  //         campaign_picture: campaignPicture,
  //         campaign_description: campaignDescription,
  //         campaign_credit: campaignCredit,
  //         campaign_requests: campaignRequests,
  //         product_name: productName,
  //         product_picture: productPicture,
  //         product_description: productDescription,
  //         product_shades: productShades,
  //         product_ingredients: productIngredients,
  //         product_instructions: productInstructions,
  //       },
  //       userCtx.accessToken
  //     );

  //     if (res.ok) {
  //       console.log("Successfully updated campaign");
  //     } else {
  //       console.error("Error updating campaign:", res.status, res.statusText);
  //     }
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //     console.log(error);
  //   }
  // };

  // const [totalCampaignRequests, setTotalCampaignRequests] = useState({});

  // const getTotalCampaignRequests = async () => {
  //   try {
  //     const res = await fetchData(
  //       "/api/campaigns/" + campaignId + "/requests",
  //       undefined,
  //       undefined,
  //       userCtx.accessToken
  //     );
  //     console.log("Response:", res); // Debugging

  //     if (res.ok) {
  //       setTotalCampaignRequests(res.data);
  //       console.log(res.data);
  //       JSON.stringify(res.data);
  //       console.log(res.data);
  //     } else {
  //       console.error("Error fetching campaigns:", res.status, res.statusText);
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCampaignDetails();
  //   getTotalCampaignRequests();
  // }, []);

  return (
    <div>
      <Card
        sx={{
          width: "400px", // Adjust the width as needed
          height: "100%",
          margin: "auto", // Center the card
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
          <Typography gutterBottom variant="h5" component="div"></Typography>
          <Typography variant="body2" color="text.secondary">
            Total samples: {props.campaignRequests}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            {props.campaignDescription}{" "}
          </Typography>
        </CardContent>
        <CardActions>
          {userCtx.role === "user" && (
            <Button onClick={() => navigateToCampaignDetail(campaignId)}>
              More Details
            </Button>
          )}
          {userCtx.role === "brand" && (
            <Button onClick={handleRequestDelete}>Delete</Button>
          )}
          {userCtx.role === "brand" && (
            <Button onClick={toggleUpdateCampaignModal}>Edit</Button>
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

      {/* <h2>{props.id}</h2>
      <h2>{props.campaignName}</h2>
      <p>{props.brandName}</p>
      <h5>
        <img src={props.campaignPicture} alt="Campaign Picture" />
      </h5>
      <p>{props.dateTime}</p>
      <p>{props.campaignRequests}</p>
      <h3>{props.campaignDescription}</h3>
      {/* <h3>{totalCampaignRequests.totalRequests}</h3> */}
      {/* <CampaignDetail
        totalCampaignRequests={totalCampaignRequests}
      ></CampaignDetail> */}
    </div>
  );
};

export default CampaignCard;
