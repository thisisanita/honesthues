# honesthues

## App Description

HonestHues is a platform that allow beauty brands to organize campaigns before new product launches to allow users to redeem makeup samples in exchange for an honest review of the makeup item.

HonestHues has 2 main objectives:

1. Allow users to post and see unsponsored, unbiased and unfiltered reviews of a makeup product that they are interested in.
2. Help brands to build a relationship with the beauty community to foster inclusivity by allowing anyone who is interested in the makeup item the opportunity to try it.

## Screenshots

### Login and Register Page.

- The platform allows 2 types of login and registration. One for users and one for brands. The respective users will have different access to different parts of the app. Upon successful registration, users will be assigned 50 credits.

![Brand Login](/frontend/src/images/brand_login.png)
![User Login](/frontend/src/images/user_login.png)
![Brand Registration](/frontend/src/images/brand_registration.png)
![User Registration](/frontend/src/images/user_registration.png)

### Campaigns Page

- Upon login, a user will be redirected to the campaign page where they can see all the listed campaigns. To see more details about the campaign, they can click on the more details button.
  ![All Campaigns](/frontend/src/images/all_campaigns.png)

- In the campaign details page, user can select the shades that they want. The item will be added to their cart when they click on the request sample button. The number of credits required for the sample is listed on the page too.
  ![Campaign Detail](/frontend/src/images/campaign_detail.png)
  ![Request Sample](/frontend/src/images/request_sample.png)

### Cart Page

- On the cart page, the user can chose to check out the samples or delete the sample. If they chose to check out a sample, credits will be deducted from their wallet. Users will not be able to check out if the credits in the wallet is lesser than the amount of credits required for a sample.
  ![Cart](/frontend/src/images/cart.png)

### Reviews Page

- On the reviews page, users can see all the products that are listed in the campaign. They will see also the average rating of the product and the total number of reviews.
- To see the reviews for the product, they have to click on the more details button.
  ![All Products](/frontend/src/images/all_product_reviews.png)

### Reviews Details Page

- On the reviews details page, users can see information about the product, all the reviews that other users have submitted regarding the product, and also the create a review for the product. Upon submitting a review, users will have 30 credits added to their cart. This is to encourage users to submit reviews for the product and ensure they have sufficient credits to request for other samples.

  ![Product Reviews](/frontend/src/images/product_reviews.png)
  ![Create Review](/frontend/src/images/create_product_review.png)

### Create Campaigns Page (Only for brand login )

- On the create campaign page, brands can see all the campaigns that they have created. They can also create a new campaign, edit the details of a campaign and delete a campaign. However, once users have submitted a review for a product, which is linked to a campaign, brands will not be able to delete the campaign.

  ![Create Campaign](/frontend/src/images/create_campaign.png)
  ![Create Campaign Modal](/frontend/src/images/create_campaign_modal.png)
  ![Update Campaign Modal](/frontend/src/images/update_campaign_modal.png)

### Technologies Used

- PERN Stack (Postgres, SQL, React, Node.js)
- Material UI
- CSS
- Phind, chatGPT

## .ENV VARIABLES

### Front-End

- VITE_SERVER

### Back-End

- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB

- ACCESS_SECRET
- REFRESH_SECRET

### Next Steps

- To implement a search function to search for specific campaigns and products so that they do not need to waste time scrolling through redundant information that doesn't not interest them.
- To allow users to pose questions to people who has already tried te makeup product so that they can get a better understanding if the product is suitable for them.
- To create a reporting feature to allow brands to know how many reviews are on the product vs the amount of samples provided so that my marketing budget is justified.
- To create an admin role and a flagging system to manage the reviews posted by users and remove unrealated, empty reviews in order to get credits and take advantage of the system

### Links

- [User Stories](https://thisisanita.atlassian.net/jira/software/projects/HH/boards/2)
- [ERD Diagram](https://miro.com/app/board/uXjVKRuQsVI=/)
