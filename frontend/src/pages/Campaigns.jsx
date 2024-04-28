import React, { useState, useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import CampaignDetail from "./CampaignDetail";

const Campaigns = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [campaigns, setCampaigns] = useState([]);
  console.log(userCtx.accessToken);

  const getAllCampaigns = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        setCampaigns(res.data);
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
    getAllCampaigns();
  }, []);

  return (
    <div>
      {/* <h1>hi</h1> */}
      {campaigns.map((campaign, idx) => {
        return (
          <CampaignCard
            campaign={campaign}
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
          ></CampaignCard>
        );
      })}
    </div>
  );
};

export default Campaigns;
