import React, { useState, useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Request from "../components/Request";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";

const Cart = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [userRequests, setUserRequest] = useState([]);
  const [walletCredits, setWalletCredits] = useState({});

  const userId = userCtx.userId;
  const userEmail = userCtx.email;

  const getUserRequests = async () => {
    try {
      const res = await fetchData(
        "/api/user/" + userId + "/requests",
        undefined,
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        setUserRequest(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
      } else {
        console.error("Error fetching request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };
  const creditsFromWallet = async () => {
    try {
      const res = await fetchData(
        "/api/user/" + userEmail + "/wallet",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setWalletCredits(res.data);
        console.log(res.data);
        JSON.stringify(res.data);
      } else {
        console.error(
          "Error fetching wallet credits:",
          res.status,
          res.statusText
        );
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRequests();
    creditsFromWallet();
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}
      >
        <h3>Wallet Amount: {walletCredits.total_amount}</h3>
      </Box>
      <div>
        {userRequests.map((request, idx) => {
          return (
            <Request
              getUserRequests={getUserRequests}
              walletCredits={walletCredits}
              creditsFromWallet={creditsFromWallet}
              requestId={request.id}
              index={request.idx}
              dateTime={request.date_time}
              productName={request.product_name}
              productShade={request.product_shade}
              campaignCredit={request.campaign_credit}
            ></Request>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
