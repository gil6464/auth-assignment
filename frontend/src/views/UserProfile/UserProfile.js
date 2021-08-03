import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Input, FormControl, TextField } from "@material-ui/core";
import avatar from "assets/img/faces/marc.jpg";

//* Get the user id from redux
import { useSelector } from "react-redux";
import axios from "axios";

//* toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import { set } from "js-cookie";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

toast.configure();

export default function UserProfile() {
  const userId = useSelector(state => state.userId);

  const [userName, setUserName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);

  //* Get data about the user from the server.
  useEffect(() => {
    setLoading(true);
    if (userId) {
      axios
        .get(`http://3.235.160.86:8080/getUserInfo/?id=${userId}`)
        .then(response => {
          setUserName(response.data.userName);
          setCompany(response.data.company);
          setEmail(response.data.email);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setCity(response.data.city);
          setCountry(response.data.country);
          setPostalCode(response.data.postalCode);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [userId]);

  const notifyUpdated = () => {
    toast.success("Updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyFieldsRequired = () => {
    toast.error("All fields are required!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyTaken = () => {
    toast.error("User Name or email is already in use", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const updateUser = async () => {
    setLoading(true);
    const user = {
      userId,
      userName,
      company,
      email,
      firstName,
      lastName,
      city,
      country,
      postalCode,
    };
    if (!Object.keys(user).every(k => user[k])) {
      notifyFieldsRequired();
      setLoading(false);
      return;
    }
    try {
      await axios.patch("http://3.235.160.86:8080/updateUser", {
        user,
      });
      setLoading(false);
      notifyUpdated();
    } catch (error) {
      setLoading(false);
      notifyTaken();
    }
  };
  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <div class="loader">Loading...</div>
      ) : (
        <GridContainer>
          <GridItem xs={18} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">Company</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-company"
                        onChange={e => setCompany(e.target.value)}
                        value={company}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">user name</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="add-post-input"
                        onChange={e => setUserName(e.target.value)}
                        value={userName}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">Email address</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">First Name</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-first-name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">Last Name</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-last-name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">City</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-city"
                        onChange={e => setCity(e.target.value)}
                        value={city}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">Country</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-country"
                        onChange={e => setCountry(e.target.value)}
                        value={country}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <FormControl id="form-control">
                      <InputLabel htmlFor="my-input">Postal Code</InputLabel>
                      <Input
                        aria-describedby="my-helper-text"
                        id="update-postal-code"
                        onChange={e => setPostalCode(e.target.value)}
                        value={postalCode}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      About me
                    </InputLabel>
                    <TextField
                      id="about-me"
                      multiline
                      rows={4}
                      fullWidth={true}
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={updateUser}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
