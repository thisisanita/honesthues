import React, { useState, useContext, useEffect } from "react";
import Button from "./Button";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

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
    await deleteRequest();
    await props.getUserRequests();

    // await deductCreditsFromWallet();
  };

  const handleRequestSubmit = async () => {
    if (props.walletCredits.total_amount > props.campaignCredit) {
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
    <div>
      {/* <h1> Wallet Amount:{walletCredits.total_amount}</h1> */}
      <h2>{props.requestId}</h2>
      <h2>{props.productName}</h2>
      <h2>{props.productShade}</h2>
      <p>{props.dateTime}</p>
      <h5>{props.campaignCredit}</h5>
      <Button onClick={handleRequestDelete}>Delete</Button>
      <Button onClick={handleRequestSubmit}>I want this</Button>
    </div>
  );
};

export default Request;
