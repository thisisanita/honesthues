import React, { useState, useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";

const CreateCampaign = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const brandEmail = userCtx.email;

  const [campaignsByBrand, setCampaignsByBrand] = useState([]);
  console.log(userCtx.accessToken);

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

  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dttapcv2c",
      uploadPreset: "xmooqktl",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info:", result.info);
      }
    }
  );

  useEffect(() => {
    // Assuming myWidget is defined and available in this scope
    const uploadWidget = document.getElementById("upload_widget");

    const handleClick = () => {
      myWidget.open();
    };

    if (uploadWidget) {
      uploadWidget.addEventListener("click", handleClick, false);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (uploadWidget) {
        uploadWidget.removeEventListener("click", handleClick, false);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  //   document.getElementById("upload_widget").addEventListener(
  //     "click",
  //     function () {
  //       myWidget.open();
  //     },
  //     false
  //   );
  useEffect(() => {
    getBrandCampaigns();
  }, []);

  return (
    <div>
      <h1>Upload Widget</h1>
      <div>
        <button id="upload_widget" className="cloudinary-button">
          Upload Files
        </button>
        <Button>Create Campaign</Button>

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
            ></CampaignCard>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCampaign;
