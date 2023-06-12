import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { AlertType } from "stores/AlertStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStores } from "stores/Context";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alertStore } = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    setIsValid(
      isValidEmail(email) &&
        isValidPassword(password) &&
        isValidPasswordConfirm(password, passwordConfirm)
    );
  }, [email, password, passwordConfirm]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };
  const isValidPasswordConfirm = (
    password: string,
    passwordConfirm: string
  ) => {
    return password === passwordConfirm;
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app/auth/signup",
        {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        }
      );
      const { signupType } = response.data;
      console.log(signupType);
      let alertMessage = `${email} 가입 완료되었습니다.`;
      if (signupType === "LINK") {
        alertMessage = `${email} 가입 링크가 전송되었습니다. 이메일 인증을 해주세요. `;
      } else if (signupType === "TOTP") {
        alertMessage = `${email} 가입 확인코드가 전송되었습니다. 이메일 인증을 해주세요. `;
      }
      alertStore.setMessage(alertMessage);
      navigate("/");
    } catch (e) {
      console.log(e);
      alertStore.setMessage("회원가입중 에러가 발생했습니다!", AlertType.ERROR);
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
      <Typography variant="h4" component="h1">
        회원가입
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
        <Box sx={{ position: "relative", width: "100%" }}>
          <TextField
            sx={{ width: "100%" }}
            label="PasswordConfirm"
            type={showPasswordConfirm ? "text" : "password"}
            variant="outlined"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
            }}
            onClick={handleTogglePasswordConfirm}
          >
            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            disabled={!isValid || isLoading}
            onClick={submitHandler}
          >
            {isLoading ? (
              <CircularProgress color="success" size={24} />
            ) : (
              "회원가입"
            )}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default SignUpForm;
