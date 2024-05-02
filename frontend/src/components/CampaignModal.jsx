import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";
import { Stack } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

const CampaignModal = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [campaignName, setCampaignName] = useState("");
  const [campaignPicture, setCampaignPicture] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignCredit, setCampaignCredit] = useState("");
  const [productName, setProductName] = useState("");
  const [productPicture, setProductPicture] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productShades, setProductShades] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productInstructions, setProductInstructions] = useState("");
  const [campaignRequests, setCampaignRequests] = useState("");
  const campaignUploadRef = useRef(null);
  const productUploadRef = useRef(null);
  console.log(props.id);

  const userEmail = userCtx.email;

  const createCampaign = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns",
        "POST",
        {
          email: userEmail,
          campaign_name: campaignName,
          campaign_picture: campaignPicture,
          campaign_description: campaignDescription,
          campaign_credit: campaignCredit,
          campaign_requests: campaignRequests,
          product_name: productName,
          product_picture: productPicture,
          product_description: productDescription,
          product_shades: productShades,
          product_ingredients: productIngredients,
          product_instructions: productInstructions,
        },
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("Successfully created campaign");
      } else {
        console.error("Error submitting request:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  //   const updateCampaign = async () => {
  //     try {
  //       const res = await fetchData(
  //         "/api/campaigns/",
  //         "PATCH",
  //         {
  //           id: props.id,
  //           campaign_name: campaignName,
  //           campaign_picture: campaignPicture,
  //           campaign_description: campaignDescription,
  //           campaign_credit: campaignCredit,
  //           campaign_requests: campaignRequests,
  //           product_name: productName,
  //           product_picture: productPicture,
  //           product_description: productDescription,
  //           product_shades: productShades,
  //           product_ingredients: productIngredients,
  //           product_instructions: productInstructions,
  //         },
  //         userCtx.accessToken
  //       );

  //       if (res.ok) {
  //         console.log("Successfully updated campaign");
  //       } else {
  //         console.error("Error updating campaign:", res.status, res.statusText);
  //       }
  //     } catch (error) {
  //       alert(JSON.stringify(error));
  //       console.log(error);
  //     }
  //   };

  //   const handleSubmitClick = async () => {
  //     if (props.mode === "create") {
  //       await createCampaign();
  //     } else if (props.mode === "edit") {
  //       await updateCampaign();
  //     }
  //     await props.getBrandCampaigns();
  //     props.toggleCampaignModal();
  //   };

  const handleCreateCampaign = async () => {
    await createCampaign();
    await props.getBrandCampaigns();
    props.toggleCampaignModal();
  };

  //   var myWidget = cloudinary.createUploadWidget(
  //     {
  //       cloudName: "dttapcv2c",
  //       uploadPreset: "xmooqktl",
  //     },
  //     (error, result) => {
  //       if (!error && result && result.event === "success") {
  //         console.log("Done! Here is the image info:", result.info);
  //       }
  //     }
  //   );

  //   useEffect(() => {
  //     // Assuming myWidget is defined and available in this scope
  //     const uploadWidget = document.getElementById("upload_widget");

  //     const handleClick = () => {
  //       myWidget.open();
  //     };

  //     if (uploadWidget) {
  //       uploadWidget.addEventListener("click", handleClick, false);
  //     }

  //     // Cleanup function to remove the event listener
  //     return () => {
  //       if (uploadWidget) {
  //         uploadWidget.removeEventListener("click", handleClick, false);
  //       }
  //     };
  //   }, []);

  useEffect(() => {
    if (!campaignUploadRef.current) {
      const cloudinaryWidgetCampaign = window.cloudinary.createUploadWidget(
        {
          cloudName: "dttapcv2c",
          uploadPreset: "xmooqktl",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setCampaignPicture(result.info.secure_url);
          }
        }
      );

      const uploadButton = document.getElementById("upload_campaign_widget");
      uploadButton.addEventListener(
        "click",
        () => {
          cloudinaryWidgetCampaign.open();
        },
        false
      );

      campaignUploadRef.current = uploadButton;
    }
  }, []);

  useEffect(() => {
    if (!productUploadRef.current) {
      const cloudinaryWidgetProduct = window.cloudinary.createUploadWidget(
        {
          cloudName: "dttapcv2c",
          uploadPreset: "xmooqktl",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setProductPicture(result.info.secure_url);
          }
        }
      );

      const uploadButton = document.getElementById("upload_product_widget");
      uploadButton.addEventListener(
        "click",
        () => {
          cloudinaryWidgetProduct.open();
        },
        false
      );

      productUploadRef.current = uploadButton;
    }
  }, []);

  return (
    <div className="overlay">
      <div className="createcampaignmodal">
        <h2>Create Campaign</h2>
        <Stack direction="row" spacing={2}>
          <Input
            label="Campaign Name"
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            fullWidth
          ></Input>
          <Input
            label="Campaign Picture"
            type="text"
            value={campaignPicture}
            onChange={(e) => setCampaignPicture(e.target.value)}
            fullWidth
          ></Input>
          <Button
            sx={{
              borderRadius: "20px",
              letterSpacing: "3px",
              padding: "8px",
              color: "#CA7DF9",
              fontWeight: "bold",
            }}
            variant="outlined"
            id="upload_campaign_widget"
            className="cloudinary-button"
            fullWidth
          >
            Upload Picture
          </Button>
        </Stack>

        <Input
          label="Campaign Description"
          type="text"
          value={campaignDescription}
          onChange={(e) => setCampaignDescription(e.target.value)}
          fullWidth
        ></Input>
        <Stack direction="row" spacing={2}>
          <Input
            label="Campaign Credit"
            type="number"
            value={campaignCredit}
            onChange={(e) => setCampaignCredit(e.target.value)}
            fullWidth
          ></Input>
          <Input
            label="Total Campaign Requests"
            type="number"
            value={campaignRequests}
            onChange={(e) => setCampaignRequests(e.target.value)}
            fullWidth
          ></Input>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Input
            label="Product Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
          ></Input>
          <Input
            label="Product Picture"
            type="text"
            value={productPicture}
            onChange={(e) => setProductPicture(e.target.value)}
            fullWidth
          ></Input>
          <Button
            sx={{
              borderRadius: "20px",
              letterSpacing: "3px",
              padding: "8px",
              color: "#CA7DF9",
              fontWeight: "bold",
            }}
            variant="outlined"
            id="upload_product_widget"
            className="cloudinary-button"
            fullWidth
          >
            Upload Picture
          </Button>
        </Stack>
        <Input
          label="Product Description"
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        ></Input>
        <Input
          label="Product Shades"
          type="text"
          value={productShades}
          onChange={(e) => setProductShades(e.target.value)}
        ></Input>
        <Input
          label="Product Ingredients"
          type="text"
          value={productIngredients}
          onChange={(e) => setProductIngredients(e.target.value)}
        ></Input>
        <Input
          label="Product Instruction"
          type="text"
          value={productInstructions}
          onChange={(e) => setProductInstructions(e.target.value)}
        ></Input>
        <Button onClick={handleCreateCampaign}>Create Campaign</Button>
      </div>
    </div>
  );
};

export default CampaignModal;
