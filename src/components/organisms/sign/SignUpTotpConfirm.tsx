import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { AlertType } from "stores/AlertStore";
import axios from "axios";
import { useState } from "react";
import { useStores } from "stores/Context";

const SignUpTotpConfirm = () => {
  const { jwt } = useParams();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { alertStore } = useStores();
  const navigate = useNavigate();
  const handleChangeVerificationCode = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;

    const regex = /^[0-9]{0,6}$/;
    if (regex.test(input)) {
      setVerificationCode(input);
    }
  };
  const submitHandler = async () => {
    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/auth/verification/totp",
        {
          token: jwt,
          totp: verificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // TODO 회원가입이 완료된 경우, 예외처리 필요

      alertStore.setMessage("이메일 인증이 되었습니다. 로그인해주세요.");
      navigate("/signin");
    } catch (error) {
      alertStore.setMessage("인증 번호를 확인해주세요.", AlertType.ERROR);
      console.error(error);
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
        인증 코드 입력
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
          label="Verification Code"
          variant="outlined"
          type="number"
          value={verificationCode}
          onChange={handleChangeVerificationCode}
        />
      </Box>
      <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
        <Button
          variant="contained"
          sx={{ flex: 1 }}
          disabled={verificationCode.length === 6 ? false : true || isLoading}
          onClick={submitHandler}
        >
          {isLoading ? <CircularProgress color="success" size={24} /> : "확인"}
        </Button>
      </Box>
    </Card>
  );
};

export default SignUpTotpConfirm;
