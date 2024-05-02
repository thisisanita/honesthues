import React, { useState, useContext, useEffect } from "react";
import Button from "./Button";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { Stack } from "@mui/material";

const Request = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const userEmail = userCtx.email;

  function showPopup(message) {
    alert(message); // Simple alert for demonstration, replace with your preferred method
  }
  const deleteRequest = async () => {
    try {
      const res = await fetchData(
        "/api/requests/" + props.requestId + "/delete",
        "DELETE",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Successfully deleted campaign");
      } else {
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const deductCreditsFromWallet = async () => {
    try {
      const res = await fetchData(
        "/api/user/wallet",
        "PATCH",
        {
          email: userEmail,
          operation: "subtract",
          amount: props.campaignCredit,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Successfully edited credits");
      } else {
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const setRequestSubmitted = async () => {
    try {
      const res = await fetchData(
        "/api/requests/" + props.requestId + "/edit",
        "PATCH",
        {
          submitted: true,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        console.log("Successfully edited submitted Status");
      } else {
        console.error(
          "Error editing submitted status:",
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

  const handleRequestDelete = async () => {
    try {
      await deleteRequest();
      await props.getUserRequests();
    } catch (error) {
      console.error("Error handling delete request:", error);
    }
  };

  const handleRequestSubmit = async () => {
    if (props.walletCredits.total_amount >= props.campaignCredit) {
      await deductCreditsFromWallet();
      await props.creditsFromWallet();
      await setRequestSubmitted();
      await props.getUserRequests();
    } else {
      showPopup(
        "Your wallet amount is less than the required campaign credit amount."
      );
    }
  };

  //   useEffect(() => {
  //     creditsFromWallet();
  //   }, []);

  return (
    <div className="wallet">
      {/* <h1> Wallet Amount:{walletCredits.total_amount}</h1> */}
      <h3>{props.productName}</h3>
      <h4>Shade: {props.productShade}</h4>
      <h4>Credits: {props.campaignCredit}</h4>
      <br></br>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            borderRadius: "20px",
            letterSpacing: "3px",
            padding: "8px",
            color: "#CA7DF9",
            fontWeight: "bold",
          }}
          variant="outlined"
          fullWidth
          onClick={handleRequestDelete}
        >
          Delete
        </Button>
        <Button fullWidth onClick={handleRequestSubmit}>
          I want this
        </Button>
      </Stack>
    </div>
  );
};

export default Request;
