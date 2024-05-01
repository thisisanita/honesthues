import React, { useEffect, useState, useContext, useRef } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";

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
        setCampaignById(res.data);
        setUpdateCampaignName(campaignById.campaign_name);
        setUpdateCampaignPicture(campaignById.campaign_picture);
        setUpdateCampaignDescription(campaignById.campaign_description);
        setUpdateCampaignCredit(campaignById.campaign_credit);
        setUpdateCampaignRequests(campaignById.campaign_requests);
        setUpdateProductName(campaignById.product_name);
        setUpdateProductPicture(campaignById.product_picture);
        setUpdateProductDescription(campaignById.product_description);
        setUpdateProductShades(campaignById.product_shades);
        setUpdateProductIngredients(campaignById.product_ingredients);
        setUpdateProductInstructions(campaignById.product_instructions);
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
          id: props.id,
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
    props.toggleUpdateCampaignModal;
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, [props.campaignId]);

  useEffect(() => {
    if (!updateCampaignUploadRef.current) {
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

      updateProductUploadRef.current = uploadButton;
    }
  }, []);

  return (
    <div>
      <Input
        label="Campaign Name"
        type="text"
        value={updateCampaignName}
        onChange={(e) => setUpdateCampaignName(e.target.value)}
      ></Input>
      <div>
        <Input
          label="Campaign Picture"
          type="text"
          value={updateCampaignPicture}
          onChange={(e) => setUpdateCampaignPicture(e.target.value)}
        ></Input>
        <Button id="upload_campaign_widget" className="cloudinary-button">
          Upload Picture
        </Button>
      </div>
      <Input
        label="Campaign Description"
        type="text"
        value={updateCampaignDescription}
        onChange={(e) => setUpdateCampaignDescription(e.target.value)}
      ></Input>
      <Input
        label="Campaign Credit"
        type="number"
        value={updateCampaignCredit}
        onChange={(e) => setUpdateCampaignCredit(e.target.value)}
      ></Input>
      <Input
        label="Total Campaign Requests"
        type="number"
        value={updateCampaignRequests}
        onChange={(e) => setUpdateCampaignRequests(e.target.value)}
      ></Input>
      <Input
        label="Product Name"
        type="text"
        value={updateProductName}
        onChange={(e) => setUpdateProductName(e.target.value)}
      ></Input>
      <div>
        <Input
          label="Product Picture"
          type="text"
          value={updateProductPicture}
          onChange={(e) => setUpdateProductPicture(e.target.value)}
        ></Input>
        <Button id="upload_product_widget" className="cloudinary-button">
          Upload Picture
        </Button>
      </div>
      <Input
        label="Product Description"
        type="text"
        value={updateProductDescription}
        onChange={(e) => setUpdateProductDescription(e.target.value)}
      ></Input>
      <Input
        label="Product Shades"
        type="text"
        value={updateProductShades}
        onChange={(e) => setUpdateProductShades(e.target.value)}
      ></Input>
      <Input
        label="Product Ingredients"
        type="text"
        value={updateProductIngredients}
        onChange={(e) => setUpdateProductIngredients(e.target.value)}
      ></Input>
      <Input
        label="Product Instruction"
        type="text"
        value={updateProductInstructions}
        onChange={(e) => setUpdateProductInstructions(e.target.value)}
      ></Input>
      <Button onClick={handleUpdateCampaign}>Update Campaign</Button>
    </div>
  );
};

export default UpdateCampaignModal;
