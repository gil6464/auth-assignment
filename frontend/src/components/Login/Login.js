import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//* For JWT Cookies
import Cookies, { set } from "js-cookie";

import axios from "axios";

//* Set the isLoggedIn state with redux;
import { useSelector, useDispatch } from "react-redux";
import { logIn, setUserId } from "../../actions";

//* Toastyfi
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
toast.configure();
export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const notifyWrong = () => {
    toast.error("Wrong Password or user name", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //* If user correct in password and user name, the function set the right cookie and redirect to the right page.

  const login = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("http://3.235.160.86:8080/login/", {
        userName,
        password,
      });

      Cookies.set("token", data.accessToken);
      Cookies.set("refreshToken", data.newRefreshToken);
      setWrongPassword(false);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("isLogIn", true);
      dispatch(logIn());
      dispatch(setUserId(data.userId));
      setRedirect(true);
      setLoading(false);
    } catch (error) {
      setWrongPassword("Wrong Password or User Name, Check again!");
      notifyWrong();
      setLoading(false);
    }
  };
  if (redirect) {
    return <Redirect to="/admin" />;
  }
  return (
    <div>
      {loading ? (
        <div class="loader">Loading...</div>
      ) : (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="User name"
                  name="User name"
                  autoComplete="email"
                  autoFocus
                  onChange={event => setUserName(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={event => setPassword(event.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={login}
                >
                  Sign In
                </Button>
                {wrongPassword && <h4>{wrongPassword}</h4>}
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="/signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
