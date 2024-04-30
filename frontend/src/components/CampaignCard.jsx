import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "./Button";
import CampaignDetail from "../pages/CampaignDetail";

const CampaignCard = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();
  const campaignId = props.id;
  console.log(campaignId);
  const navigateToCampaignDetail = (campaignId) => {
    console.log("Navigating to campaign detail:", campaignId);
    navigate("/campaigns/" + campaignId);
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const handleRequestDelete = async () => {
    await deleteCampaign();
    await props.getBrandCampaigns();
  };

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
  //   // getCampaignDetails();
  //   getTotalCampaignRequests();
  // }, []);

  return (
    <div>
      <h2>{props.id}</h2>
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
      {userCtx.role == !"brand" && (
        <Button onClick={() => navigateToCampaignDetail(campaignId)}>
          More Details
        </Button>
      )}
      {userCtx.role === "brand" && (
        <Button onClick={handleRequestDelete}>Delete</Button>
      )}
      {userCtx.role === "brand" && (
        <Button onClick={toggleUpdateModal}>Edit</Button>
      )}
    </div>
  );
};

export default CampaignCard;
