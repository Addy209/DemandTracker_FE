import { IconButton, Stack, useTheme } from "@mui/joy";
import React from "react";
import Header from "./Header";
import { TiArrowBack } from "react-icons/ti";

const HeaderWithBackButton = ({ demand, setDemandDetails }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"}>
      <IconButton
        variant="solid"
        size="sm"
        sx={{
          height: "max-content",
          mt: 3,
          ml: 1,
          px: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.level1,
          border: "1px solid " + theme.palette.border.primary,
          "&:hover": {
            backgroundColor: theme.palette.background.surface,
          },
        }}
        onClick={() => {
          setDemandDetails({ show: false, index: -1 });
        }}
      >
        <TiArrowBack size={"1.2rem"} />
      </IconButton>
      <Header
        pageTitle={`${demand.demandId} (${demand.projectId}): ${demand.projectName}`}
        pageSubTitle={demand.integrationDetails}
        pageIndex={1}
        isHtml={true}
      />
    </Stack>
  );
};

export default HeaderWithBackButton;
