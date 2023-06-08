import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AlertType } from "stores/AlertStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStores } from "stores/Context";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { alertStore, authStore } = useStores();

  useEffect(() => {
    setIsValid(isValidEmail(email) && isValidPassword(password));
  }, [email, password]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("http://localhost:3000/auth/signin", {
        email: email,
        password: password,
      });
      const { access_token, refresh_token } = result.data;
      alertStore.setMessage("Success SignIn!");
      authStore.setToken(access_token, refresh_token);
      navigate("/");
    } catch (e) {
      console.log(e);
      alertStore.setMessage("Fail SignIn!", AlertType.ERROR);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        alertStore.clearMessage();
      }, 3000);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
        gap: "2rem",
        width: "400px",
        margin: "0 auto",
      }}
    >
      <LinearProgress />
      <Typography variant="h4" component="h1">
        SignIn
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          gap: "1rem",
        }}
      >
        <TextField
          sx={{ width: "100%" }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            sx={{ width: "100%" }}
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
            }}
            onClick={handleTogglePassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
          <Button
            variant="outlined"
            sx={{ flex: 1 }}
            onClick={(e) => navigate("/signup")}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            disabled={!isValid}
            onClick={submitHandler}
          >
            {isLoading ? (
              <CircularProgress color="success" size={24} />
            ) : (
              "SignIn"
            )}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default SignInForm;
