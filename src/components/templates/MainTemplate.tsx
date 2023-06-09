import { Alert, Box, Slide, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import Header from "components/organisms/header/Header";
import { observer } from "mobx-react-lite";
import { useStores } from "stores/Context";

interface MainTemplateProps {
  children?: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const { alertStore } = useStores();

  return (
    <Box>
      <Header />
      <Stack
        sx={{ width: "100%", position: "absolute", zIndex: 99, top: 48 }}
        spacing={2}
      >
        <Slide
          direction="down"
          in={alertStore.isAlert}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Alert variant="filled" severity={alertStore.getAlertType()}>
            {alertStore.getMessage()}
          </Alert>
        </Slide>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 48px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default observer(MainTemplate);
