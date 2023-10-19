import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = (): JSX.Element => {
  const history = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formInput: any) => {
    setLoader(true);
    axios
      .get(
        `http://localhost:3001/api/login?email=${email}&password=${password}`
      )
      .then((result: any) => {
        console.log("Login Result", result);
        if (result.data.status === 200) {
          history("/dashboard");
        } else if (result.data.status === 403) {
          alert("Wrong password!Try again");
        } else {
          alert("Not registered");
          history("/");
        }
        setLoader(false);
      })
      .catch((err: any) => {
        alert("Not registered");
        history("/");
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <div
      className="register-page"
      style={{
        width: "100%",
        height: "800px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loader && <CircularProgress color="success" />}
      {!loader && (
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            marginTop: 20,
            justifyItems: "center",
            width: 400,
            height: 400,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ bgcolor: "#1b5e20" }}>
                  <Typography
                    variant="h3"
                    component="h3"
                    color="white"
                    display={"flex"}
                    justifyContent={"center"}
                    fontFamily="sans-serif"
                  >
                    <img
                      src="/nutrifit-logo.jpg"
                      height={60}
                      width={60}
                      alt="Logo"
                    />
                    <Box sx={{ paddingLeft: "4px" }}>Register</Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="email">Email</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your Email"
                  aria-label="email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="password">Password</FormLabel>
                <TextField
                  fullWidth
                  aria-label="password"
                  placeholder="Enter your password"
                  type="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} alignItems="center">
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} alignItems="center">
                <Link to="/register">Need an account?Sign Up Here!</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </div>
  );
};

export default Login;
