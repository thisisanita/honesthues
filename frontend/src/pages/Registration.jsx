import React, { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import Button from "../components/Button";

const Registration = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  // const assignCreditstoWallet = async () => {
  //   try {
  //     const res = await fetchData(
  //       "/api/user/wallet",
  //       "POST",
  //       {
  //         email: userCtx.email,
  //       },
  //       userCtx.accessToken
  //     );
  //     console.log("Response:", res); // Debugging

  //     if (res.ok) {
  //       console.log("Successfully submitted request");
  //     } else {
  //       console.error("Error submitting request:", res.status, res.statusText);
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     alert(JSON.stringify(error));
  //     console.log(error);
  //   }
  // };

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
    } else {
      console.log(res.data);
    }
  };

  return (
    <div>
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      ></Input>
      <Input
        label="Contact"
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      ></Input>
      {userType === "brand" && (
        <>
          <Input
            label="Contact Person"
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          ></Input>
          <Input
            label="Website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></Input>
        </>
      )}
      <Input
        label="Address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></Input>

      <Button variant="contained" color="primary" onClick={handleRegistration}>
        Register
      </Button>
    </div>
  );
};

export default Registration;
