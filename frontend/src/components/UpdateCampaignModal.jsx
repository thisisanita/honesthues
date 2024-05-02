import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";

const UpdateCampaignModal = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [campaignById, setCampaignById] = useState({});
  const [updateCampaignName, setUpdateCampaignName] = useState("");
  const [updateCampaignPicture, setUpdateCampaignPicture] = useState("");
  const [updateCampaignDescription, setUpdateCampaignDescription] =
    useState("");
  const [updateCampaignCredit, setUpdateCampaignCredit] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductPicture, setUpdateProductPicture] = useState("");
  const [updateProductDescription, setUpdateProductDescription] = useState("");
  const [updateProductShades, setUpdateProductShades] = useState("");
  const [updateProductIngredients, setUpdateProductIngredients] = useState("");
  const [updateProductInstructions, setUpdateProductInstructions] =
    useState("");
  const [updateCampaignRequests, setUpdateCampaignRequests] = useState("");
  const updateCampaignUploadRef = useRef(null);
  const updateProductUploadRef = useRef(null);
  console.log(props.id);
  const campaignId = props.campaignId;

  const userEmail = userCtx.email;

  const fetchCampaignDetails = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/" + campaignId + "/detail",
        undefined,
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        // setCampaignById(res.data);
        setUpdateCampaignName(res.data.campaign_name);
        setUpdateCampaignPicture(res.data.campaign_picture);
        setUpdateCampaignDescription(res.data.campaign_description);
        setUpdateCampaignCredit(res.data.campaign_credit);
        setUpdateCampaignRequests(res.data.campaign_requests);
        setUpdateProductName(res.data.product_name);
        setUpdateProductPicture(res.data.product_picture);
        setUpdateProductDescription(res.data.product_description);
        setUpdateProductShades(res.data.product_shades);
        setUpdateProductIngredients(res.data.product_ingredients);
        setUpdateProductInstructions(res.data.product_instructions);
      } else {
        console.error(
          "Error fetching campaign details:",
          res.status,
          res.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  const updateCampaign = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns/",
        "PATCH",
        {
          id: campaignId,
          campaign_name: updateCampaignName,
          campaign_picture: updateCampaignPicture,
          campaign_description: updateCampaignDescription,
          campaign_credit: updateCampaignCredit,
          campaign_requests: updateCampaignRequests,
          product_name: updateProductName,
          product_picture: updateProductPicture,
          product_description: updateProductDescription,
          product_shades: updateProductShades,
          product_ingredients: updateProductIngredients,
          product_instructions: updateProductInstructions,
        },
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("Successfully updated campaign");
      } else {
        console.error("Error updating campaign:", res.status, res.statusText);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  //   const handleSubmitClick = async () => {
  //     if (props.mode === "create") {
  //       await createCampaign();
  //     } else if (props.mode === "edit") {
  //       await updateCampaign();
  //     }
  //     await props.getBrandCampaigns();
  //     props.toggleCampaignModal();
  //   };

  const handleUpdateCampaign = async () => {
    await updateCampaign();
    await props.getBrandCampaigns();
    props.toggleUpdateCampaignModal();
  };

  useEffect(() => {
    if (!updateCampaignUploadRef.current) {
      const cloudinaryWidgetCampaign = window.cloudinary.createUploadWidget(
        {
          cloudName: "dttapcv2c",
          uploadPreset: "xmooqktl",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setUpdateCampaignPicture(result.info.secure_url);
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

      updateCampaignUploadRef.current = uploadButton;
    }
  }, []);

  useEffect(() => {
    if (!updateProductUploadRef.current) {
      const cloudinaryWidgetProduct = window.cloudinary.createUploadWidget(
        {
          cloudName: "dttapcv2c",
          uploadPreset: "xmooqktl",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setUpdateProductName(result.info.secure_url);
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

      updateProductUploadRef.current = uploadButton;
    }
  }, []);

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  return (
    <div className="overlay">
      <div className="updatecampaignmodal">
        <h2>Update Campaign</h2>
        <Stack direction="row" spacing={2}>
          <Input
            label="Campaign Name"
            type="text"
            value={updateCampaignName}
            onChange={(e) => setUpdateCampaignName(e.target.value)}
            fullWidth
          ></Input>

          <Input
            label="Campaign Picture"
            type="text"
            value={updateCampaignPicture}
            onChange={(e) => setUpdateCampaignPicture(e.target.value)}
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
          value={updateCampaignDescription}
          onChange={(e) => setUpdateCampaignDescription(e.target.value)}
          fullWidth
        ></Input>
        <Stack direction="row" spacing={2}>
          <Input
            label="Campaign Credit"
            type="number"
            value={updateCampaignCredit}
            onChange={(e) => setUpdateCampaignCredit(e.target.value)}
            fullWidth
          ></Input>
          <Input
            label="Total Campaign Requests"
            type="number"
            value={updateCampaignRequests}
            onChange={(e) => setUpdateCampaignRequests(e.target.value)}
            fullWidth
          ></Input>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Input
            label="Product Name"
            type="text"
            value={updateProductName}
            onChange={(e) => setUpdateProductName(e.target.value)}
            fullWidth
          ></Input>
          <Input
            label="Product Picture"
            type="text"
            value={updateProductPicture}
            onChange={(e) => setUpdateProductPicture(e.target.value)}
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
          value={updateProductDescription}
          onChange={(e) => setUpdateProductDescription(e.target.value)}
          fullWidth
        ></Input>
        <Input
          label="Product Shades"
          type="text"
          value={updateProductShades}
          onChange={(e) => setUpdateProductShades(e.target.value)}
          fullWidth
        ></Input>
        <Input
          label="Product Ingredients"
          type="text"
          value={updateProductIngredients}
          onChange={(e) => setUpdateProductIngredients(e.target.value)}
          fullWidth
        ></Input>
        <Input
          label="Product Instruction"
          type="text"
          value={updateProductInstructions}
          onChange={(e) => setUpdateProductInstructions(e.target.value)}
          fullWidths
        ></Input>
        <Button onClick={handleUpdateCampaign}>Update Campaign</Button>
      </div>
    </div>
  );
};

export default UpdateCampaignModal;
