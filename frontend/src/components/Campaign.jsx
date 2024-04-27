import React from "react";

const Campaign = (props) => {
  console.log(props.campaign_name);
  return (
    <div>
      <h1>Campaign Name:{props.campaign_name}</h1>
    </div>
  );
};

export default Campaign;
