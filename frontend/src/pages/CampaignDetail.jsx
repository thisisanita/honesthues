import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "../components/Button";
import DropDown from "../components/DropDown";

const CampaignDetail = (props) => {
  const { campaignId } = useParams();
  const [campaignDetails, setCampaignDetails] = useState({});
  const [campaignRequests, setCampaignRequests] = useState({});
  const [productShadesArray, setProductShadesArray] = useState([]);
  const [selectedShade, setSelectedShade] = useState("");

  const userCtx = useContext(UserContext);

  const fetchData = useFetch();
  console.log(campaignDetails.campaign_name);
  // const productShades = campaignDetails.product_shades;
  // console.log(productShades);
  // // const productShadesArray = productShades.split(", ");
  // console.log(productShadesArray);

  const getCampaignDetails = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId,
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
      <h1>{campaignDetails.campaign_name}</h1>
      <h1>{campaignDetails.campaign_description}</h1>
      <h1>{campaignDetails.product_shades}</h1>

      {/* <h1>{props.totalCampaignRequests}</h1> */}
      <h1>{campaignRequests.totalRequests}</h1>
      <DropDown
        labelId="shade-select-label"
        label="Shade"
        value={selectedShade}
        options={productShadesArray}
        onChange={(e) => setSelectedShade(e.target.value)}
      ></DropDown>
      <Button>Request Sample</Button>
    </div>
  );
};

export default CampaignDetail;
