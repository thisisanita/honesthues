import React from "react";

const ReviewProfileCard = (props) => {
  const userInfo = props.userReviewInfo;
  console.log(userInfo);
  return (
    <div>
      <h3>{userInfo.name}</h3>
      <p>
        {userInfo.skin_tone},{userInfo.skin_type},{userInfo.hair_colour},
        {userInfo.eye_colour},{userInfo.age_group},
      </p>
    </div>
  );
};

export default ReviewProfileCard;
