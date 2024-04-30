import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";

const CampaignModal = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [campaignName, setCampaignName] = useState("");
  const [campaignPicture, setCampaignPicture] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignCredit, setCampaignCredit] = useState("");
  const [productName, setProductName] = useState("");
  const [productPicture, setProductPicture] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productShades, SetProductShades] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productInstructions, setProductInstructions] = useState("");
  const [campaignRequests, setCampaignRequests] = userState("");

  return (
    <div>
      <Input
        label="Campaign Name"
        type="text"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      ></Input>
      <Input
        label="Campaign Picture"
        type="file"
        value={campaignPicture}
        onChange={(e) => setCampaignPicture(e.target.value)}
      ></Input>
      <Input
        label="Campaign Description"
        type="text"
        value={campaignDescription}
        onChange={(e) => setCampaignDescription(e.target.value)}
      ></Input>
      <Input
        label="Campaign Credit"
        type="text"
        value={campaignCredit}
        onChange={(e) => setCampaignCredit(e.target.value)}
      ></Input>
      <Input
        label="Total Campaign Requests"
        type="text"
        value={campaignRequests}
        onChange={(e) => setCampaignRequests(e.target.value)}
      ></Input>
      <Input
        label="Product Name"
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      ></Input>
      <Input
        label="Product Picture"
        type="text"
        value={productPicture}
        onChange={(e) => setProductPicture(e.target.value)}
      ></Input>
      <Input
        label="Product Description"
        type="file"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></Input>
      <Input
        label="Product Shades"
        type="text"
        value={productShades}
        onChange={(e) => SetProductShades(e.target.value)}
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
        onChange={(e) => productInstructions(e.target.value)}
      ></Input>
      <Button>Create Campaign</Button>
    </div>
  );
};

export default CampaignModal;
