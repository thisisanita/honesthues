import React, { useState, useContext, useEffect } from "react";
import Campaign from "../components/Campaign";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const Campaigns = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [campaigns, setCampaigns] = useState([]);

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
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div>
      <h1>hi</h1>
      {/* {campaigns.map((campaign) => {
        <Campaign
          key={campaign.id}
          id={campaign.id}
          campaign_picture={campaign.campaign_picture}
          campaign_description={campaign.campaign_description}
          campaign_credit={campaign.campaign_credit}
          campaign_name={campaign.campaign_name}
          product_name={campaign.product_name}
          product_description={campaign.product_description}
          product_shades={campaign.product_shades}
          product_shades_picture={campaign.product_shades_picture}
          product_ingredients={campaign.product_ingredients}
          product_instructions={campaign.product_instructions}
        ></Campaign>;
      })} */}
    </div>
  );
};

export default Campaigns;
