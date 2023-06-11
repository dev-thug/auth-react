import {
  Box,
  Button,
  Card,
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import {
  CheckCircle,
  Email,
  ExpandLess,
  ExpandMore,
  Face5,
  Key,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

import AccoutListItem from "components/morecules/AccoutListItem";
import { AlertType } from "stores/AlertStore";
import api from "api/axios.interceptor";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStores } from "stores/Context";

const Account = () => {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { alertStore } = useStores();
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
  };
  const { authStore } = useStores();

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  useEffect(() => {
    setIsValid(
      isValidPassword(password) &&
        isValidPasswordConfirm(password, passwordConfirm)
    );
  }, [password, passwordConfirm]);

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
      const response = await api.put("/user/password", {
        oldPassword: oldPassword,
        newPassword: password,
        newPasswordConfirm: passwordConfirm,
      });

      let alertMessage = `비밀번호가 재설정 되었습니다.`;

      alertStore.setMessage(alertMessage);
      navigate("/");
    } catch (e) {
      console.log(e);
      alertStore.setMessage("Fail SignUp!", AlertType.ERROR);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        alertStore.clearMessage();
      }, 3000);
    }
  };
  return (
    <Card sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <AccoutListItem
            icon={<Email />}
            value={authStore.payload!.username}
          />
          <AccoutListItem
            icon={<CheckCircle />}
            value={authStore.payload!.emailVerified ? "인증됨" : "인증안됨"}
          />

          <AccoutListItem
            icon={<Face5 />}
            value={authStore.payload!.role.toString()}
          />
        </List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{<Key />}</ListItemIcon>
          <ListItemText primary="비밀번호 변경하기" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            sx={{
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                label="OldPassword"
                type={showOldPassword ? "text" : "password"}
                variant="outlined"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                }}
                onClick={handleToggleOldPassword}
              >
                {showOldPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Box>
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
                  "비밀번호 재설정"
                )}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </nav>
    </Card>
  );
};

export default observer(Account);
