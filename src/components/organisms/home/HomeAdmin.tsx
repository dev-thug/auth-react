import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { AlertType } from "stores/AlertStore";
import api from "api/axios.interceptor";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStores } from "stores/Context";

enum SignUpMode {
  LINK = "link",
  TOTP = "totp",
  NO = "no",
}

const HomeAdmin = () => {
  const { alertStore } = useStores();
  const [mode, setMode] = useState<SignUpMode>(SignUpMode.LINK);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSignUpMode = async () => {
      const response = await api.get(
        "https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app/admin/sign/mode"
      );
      const mode = response.data.mode;
      switch (mode) {
        case "TOTP":
          setMode(SignUpMode.TOTP);
          break;
        case "LINK":
          setMode(SignUpMode.LINK);
          break;
        case "NoEmailVerification":
          setMode(SignUpMode.NO);
          break;
      }
    };

    try {
      fetchSignUpMode();
    } catch (e) {}
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    switch (value) {
      case "link":
        setMode(SignUpMode.LINK);
        break;
      case "totp":
        setMode(SignUpMode.TOTP);
        break;
      case "no":
        setMode(SignUpMode.NO);
        break;
    }
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app/admin/sign/${mode.toString()}`
      );
      const { signupType } = response.data;
      console.log(signupType);
      let alertMessage = `변경 되었습니다.`;

      alertStore.setMessage(alertMessage);
    } catch (e) {
      console.log(e);
      alertStore.setMessage("에러가 발생했습니다!", AlertType.ERROR);
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          회원가입 인증 모드
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode.toString()}
          label="회원가입 인증 모드"
          onChange={handleChange}
        >
          <MenuItem value={SignUpMode.LINK}>링크</MenuItem>
          <MenuItem value={SignUpMode.TOTP}>인증 코드</MenuItem>
          <MenuItem value={SignUpMode.NO}>인증 없음</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
        <Button
          variant="contained"
          sx={{ flex: 1 }}
          disabled={isLoading}
          onClick={submitHandler}
        >
          {isLoading ? <CircularProgress color="success" size={24} /> : "확인"}
        </Button>
      </Box>
    </Card>
  );
};

export default observer(HomeAdmin);
