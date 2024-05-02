import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Registration = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [skinType, setSkinType] = useState("");
  const [hairColour, setHairColour] = useState("");
  const [eyeColour, setEyeColour] = useState("");

  const assignCreditstoWallet = async () => {
    if (userType === "user") {
      const body = {
        email: email,
      };
      const res = await fetchData("/auth/user/wallet", "POST", body);
      if (res.ok) {
        console.log("Successfully assigned credits to user's wallet.");
      } else {
        console.error("Error assigning credits:", res.status, res.statusText);
        console.log(res.data);
      }
    } else {
      console.log("Credits not assigned. User role is not 'user'.");
    }
  };

  const handleRegistration = async () => {
    const body = {
      username,
      password,
      email,
      userType,
      name,
      contact,
      contact_person: contactPerson,
      website,
      address,
      gender,
      age_group: ageGroup,
      skin_tone: skinTone,
      skin_type: skinType,
      hair_colour: hairColour,
      eye_colour: eyeColour,
    };
    const res = await fetchData("/auth/register", "POST", body);

    if (res.ok) {
      setUsername("");
      setPassword("");
      setEmail("");
      setUserType("");
      setName("");
      setContact("");
      setContactPerson("");
      setWebsite("");
      setAddress("");
      setGender("");
      setAgeGroup("");
      setSkinTone("");
      setSkinType("");
      setHairColour("");
      setEyeColour("");
      assignCreditstoWallet();
    } else {
      console.log(res.data);
    }
  };

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // height="600px"
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            // margin="16px"
            width="500px"
          >
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            ></Input>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            ></Input>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            ></Input>
            <DropDown
              labelId="usertype-select-label"
              label="User Type"
              value={userType}
              options={["user", "brand"]}
              onChange={(e) => setUserType(e.target.value)}
            ></DropDown>
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            ></Input>
            <Input
              label="Contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              fullWidth
            ></Input>
            <Input
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            ></Input>
            {userType !== "brand" && (
              <>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  // margin="16px"
                  width="500px"
                >
                  <DropDown
                    labelId="gender-select-label"
                    label="gender"
                    value={gender}
                    options={["Male", "Female", "Non-Binary"]}
                    onChange={(e) => setGender(e.target.value)}
                  ></DropDown>
                  <DropDown
                    labelId="ageGroup-select-label"
                    label="Age Group"
                    value={ageGroup}
                    options={[
                      "Below 20",
                      "20 to 30",
                      "30 to 40",
                      "40 to 50",
                      "50 to 60",
                      "Above 60",
                    ]}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  ></DropDown>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  // margin="16px"
                  width="500px"
                >
                  <DropDown
                    labelId="skinTone-select-label"
                    label="Skin Tone"
                    value={skinTone}
                    options={[
                      "Very Light",
                      "Light",
                      "Light Medium",
                      "Medium",
                      "Medium Deep",
                      "Deep",
                    ]}
                    onChange={(e) => setSkinTone(e.target.value)}
                  ></DropDown>
                  <DropDown
                    labelId="skinType-select-label"
                    label="Skin Type"
                    value={skinType}
                    options={[
                      "Normal",
                      "Oily",
                      "Dry",
                      "Combination",
                      "Acne-Prone",
                      "sensitive",
                      "Mature",
                    ]}
                    onChange={(e) => setSkinType(e.target.value)}
                  ></DropDown>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  // margin="16px"
                  width="500px"
                >
                  <DropDown
                    labelId="hairColour-select-label"
                    label="Hair Colour"
                    value={hairColour}
                    options={[
                      "Black",
                      "Brown",
                      "Auburn",
                      "Red",
                      "Blonde",
                      "Gray",
                      "White",
                    ]}
                    onChange={(e) => setHairColour(e.target.value)}
                  ></DropDown>
                  <DropDown
                    labelId="eyeColour-select-label"
                    label="Eye Colour"
                    value={eyeColour}
                    options={[
                      "Brown",
                      "Amber",
                      "Auburn",
                      "Green",
                      "Hazel",
                      "Blue",
                      "Grey",
                    ]}
                    onChange={(e) => setEyeColour(e.target.value)}
                  ></DropDown>
                </Stack>
              </>
            )}
            {userType === "brand" && (
              <>
                <Input
                  label="Contact Person"
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  fullWidth
                ></Input>
                <Input
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                ></Input>
                <Input
                  label="Website"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  fullWidth
                ></Input>
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleRegistration}
              fullWidth
            >
              Register
            </Button>
            <Link to="/login">
              <Button sx={{ color: "#CA7DF9" }} variant="text" fullWidth>
                Already have an account? Sign in
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
