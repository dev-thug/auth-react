import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { AlertType } from "stores/AlertStore";
import api from "api/axios.interceptor";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStores } from "stores/Context";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { authStore, alertStore } = useStores();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = async () => {
    try {
      const response = await api.post(
        "https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app/auth/signout",
        {}
      );
      alertStore.setMessage("로그아웃 성공");

      navigate("/");
    } catch (e) {
      console.log(e);
      alertStore.setMessage("Fail SignOut!", AlertType.ERROR);
    } finally {
      handleClose();
      setTimeout(() => {
        alertStore.clearMessage();
      }, 3000);
    }
    authStore.clearToken();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            onClick={(e) => navigate("/")}
            sx={{ cursor: "pointer", ":hover": { color: "#dddddd" } }}
          >
            Auth React
          </Typography>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            {authStore.getIsAuth() ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={(e) => {
                      navigate("/account");
                      handleClose();
                    }}
                  >
                    <ManageAccounts />
                    <Typography flex={1} textAlign={"center"}>
                      계정
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={async () => signOutHandler()}>
                    <Logout />
                    <Typography flex={1} textAlign={"center"}>
                      로그아웃{" "}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Typography
                  variant="button"
                  color="inherit"
                  component="div"
                  onClick={(e) => navigate("/signin")}
                  sx={{ cursor: "pointer", ":hover": { color: "#dddddd" } }}
                >
                  Login
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default observer(Header);
