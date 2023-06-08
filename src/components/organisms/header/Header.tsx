import {
  Alert,
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { AlertType } from "stores/AlertStore";
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
    let config = {
      headers: {
        Authorization: `Bearer ${authStore.authToken}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        config
      );
      alertStore.setMessage("Success SignOut!");
      authStore.clearToken();
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={async () => signOutHandler()}>
                    SignOut
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
