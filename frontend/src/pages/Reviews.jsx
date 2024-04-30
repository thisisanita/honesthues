import React, { useState, useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import CampaignDetail from "./CampaignDetail";

const Reviews = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [products, setProducts] = useState([]);
  console.log(userCtx.accessToken);

  const getAllProducts = async () => {
    try {
      const res = await fetchData(
        "/api/campaigns",
        undefined,
        undefined,
        userCtx.accessToken
      );
      console.log("Response:", res); // Debugging

      if (res.ok) {
        setProducts(res.data);
        JSON.stringify(res.data);
        console.log(res.data);
      } else {
        console.error("Error fetching products:", res.status, res.statusText);
        console.log(res.data);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {/* <h1>hi</h1> */}
      {products.map((product, idx) => {
        return (
          <ProductCard
            campaign={product}
            index={product.idx}
            key={product.id}
            id={product.id}
            // campaignPicture={campaign.campaign_picture}
            // campaignDescription={campaign.campaign_description}
            // campaignCredit={campaign.campaign_credit}
            // campaignName={campaign.campaign_name}
            productName={product.product_name}
            productDescription={product.product_description}
            productShades={product.product_shades}
            productShadesPicture={product.product_shades_picture}
            productIngredients={product.product_ingredients}
            productInstructions={product.product_instructions}
            brandName={product.name}
            // dateTime={product.date_time}
            // campaignRequests={campaign.campaign_requests}
          ></ProductCard>
        );
      })}
    </div>
  );
};

export default Reviews;
