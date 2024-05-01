import React, { useState, useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import CampaignModal from "../components/CampaignModal";

const CreateCampaign = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const brandEmail = userCtx.email;

  const [campaignsByBrand, setCampaignsByBrand] = useState([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  //   const [editingCampaign, setEditingCampaign] = useState(null);

  const toggleCampaignModal = () => {
    setShowCampaignModal(!showCampaignModal);
  };

  //   const handleEditCampaign = (campaign) => {
  //     setEditingCampaign(campaign);
  //     toggleCampaignModal();
  //   };

  //   console.log(userCtx.accessToken);

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
        <Button onClick={toggleCampaignModal}>Create Campaign</Button>

        {showCampaignModal && (
          <CampaignModal
            getBrandCampaigns={getBrandCampaigns}
            toggleCampaignModal={toggleCampaignModal}
            showCampaignModal={showCampaignModal}
            setShowCampaignModal={setShowCampaignModal}
            // mode={editingCampaign ? "edit" : "create"}
            // campaignData={editingCampaign || {}}
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
              // handleEditCampaign={handleEditCampaign}
            ></CampaignCard>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCampaign;
