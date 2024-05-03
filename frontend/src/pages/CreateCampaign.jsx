import React, { useState, useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import CampaignModal from "../components/CampaignModal";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";

const CreateCampaign = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const brandEmail = userCtx.email;

  const [campaignsByBrand, setCampaignsByBrand] = useState([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const toggleCampaignModal = () => {
    setShowCampaignModal(!showCampaignModal);
  };

  const getBrandCampaigns = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + brandEmail,
        undefined,
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        setCampaignsByBrand(res.data);
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
    getBrandCampaigns();
  }, []);

  return (
    <div>
      <div>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}
        >
          <Button onClick={toggleCampaignModal}>Create Campaign</Button>
        </Box>

        {showCampaignModal && (
          <CampaignModal
            getBrandCampaigns={getBrandCampaigns}
            toggleCampaignModal={toggleCampaignModal}
            showCampaignModal={showCampaignModal}
            setShowCampaignModal={setShowCampaignModal}
          />
        )}

        {campaignsByBrand.map((campaign, idx) => {
          return (
            <CampaignCard
              campaign={campaign}
              getBrandCampaigns={getBrandCampaigns}
              index={campaign.idx}
              key={campaign.id}
              id={campaign.id}
              campaignPicture={campaign.campaign_picture}
              campaignDescription={campaign.campaign_description}
              campaignCredit={campaign.campaign_credit}
              campaignName={campaign.campaign_name}
              productName={campaign.product_name}
              productDescription={campaign.product_description}
              productShades={campaign.product_shades}
              productShadesPicture={campaign.product_shades_picture}
              productIngredients={campaign.product_ingredients}
              productInstructions={campaign.product_instructions}
              brandName={campaign.name}
              dateTime={campaign.date_time}
              campaignRequests={campaign.campaign_requests}
              toggleCampaignModal={toggleCampaignModal}
            ></CampaignCard>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCampaign;
