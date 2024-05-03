import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";

const CampaignDetail = (props) => {
  const { campaignId } = useParams();
  const [campaignDetails, setCampaignDetails] = useState({});
  const [campaignRequests, setCampaignRequests] = useState({});
  const [productShadesArray, setProductShadesArray] = useState([]);
  const [selectedShade, setSelectedShade] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const userCtx = useContext(UserContext);
  const userEmail = userCtx.email;
  console.log(userCtx.email);
  const userId = userCtx.userId;
  console.log(userId);
  const fetchData = useFetch();

  const getCampaignDetails = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/detail",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        setCampaignDetails(res.data);
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

  const getCampaignRequests = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/requests",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        setCampaignRequests(res.data);
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

  const createRequestForCampaign = async () => {
    try {
      const res = await fetchData(
        "/api/requests",
        "POST",
        {
          userId: userId,
          campaignId: campaignId,
          received: false,
          productShade: selectedShade,
        },
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        console.log("Successfully submitted request");
      } else {
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const handleRequestClick = async () => {
    await createRequestForCampaign();
    await getCampaignRequests();
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    getCampaignDetails();
    getCampaignRequests();
  }, []);

  useEffect(() => {
    // Only set productShadesArray if productShades is available
    if (campaignDetails.product_shades) {
      setProductShadesArray(campaignDetails.product_shades.split(", "));
    }
  }, [campaignDetails]);

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
          <h1>{campaignDetails.campaign_name}</h1>

          <img
            className="campaignpicture"
            src={campaignDetails.campaign_picture}
            alt="Campaign Picture"
          />
          <p>{campaignDetails.campaign_description}</p>
          <p>Campaign Credits: {campaignDetails.campaign_credit}</p>
          <p>
            {campaignRequests.totalRequests}/{campaignDetails.campaign_requests}{" "}
            samples has been requested
          </p>
          <Stack direction="row" spacing={2} width="70%">
            <DropDown
              labelId="shade-select-label"
              label="Shade"
              value={selectedShade}
              options={productShadesArray}
              onChange={(e) => setSelectedShade(e.target.value)}
              fullWidth
            ></DropDown>
            <Button
              sx={{
                width: "50%",
                borderRadius: "20px",
                margin: "8px 32px 8px 32px",
                letterSpacing: "3px",
                color: "white",
                fontWeight: "bold",
              }}
              disabled={isButtonDisabled}
              onClick={handleRequestClick}
            >
              Request Sample
            </Button>
          </Stack>
        </Stack>
      </Box>
      <br></br>
    </div>
  );
};

export default CampaignDetail;
