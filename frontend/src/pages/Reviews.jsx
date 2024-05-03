import React, { useState, useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import CampaignDetail from "./CampaignDetail";

const Reviews = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [products, setProducts] = useState([]);

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
    <div className="campaigncard">
      {products.map((product, idx) => {
        return (
          <ProductCard
            campaign={product}
            index={product.idx}
            key={product.id}
            id={product.id}
            productName={product.product_name}
            productDescription={product.product_description}
            productShades={product.product_shades}
            productPicture={product.product_picture}
            productIngredients={product.product_ingredients}
            productInstructions={product.product_instructions}
            brandName={product.name}
          ></ProductCard>
        );
      })}
    </div>
  );
};

export default Reviews;
