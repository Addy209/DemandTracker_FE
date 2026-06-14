import { Box, IconButton, Stack, useTheme } from "@mui/joy";
import React from "react";
import Header from "../components/Header";
import { useDemands } from "../store/state";
import { TiArrowBack } from "react-icons/ti";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import DemandDetails from "../components/DemandDetails";
import Meta from "../components/Meta";

const Demand = ({ index, setDemandDetails }) => {
  const { demandCards } = useDemands();
  const demand = demandCards[index];
  const theme = useTheme();
  return (
    <Stack sx={{ width: "100%", height: "100dvh" }}>
      <HeaderWithBackButton
        demand={demand}
        setDemandDetails={setDemandDetails}
      />
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          pl: 8,
          pr: 3,
          pt: 1,
          mt: 1,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            height: "85dvh",
          }}
          gap={2}
        >
          <Stack direction={"column"} gap={2} width={"40%"} height={"100%"}>
            <Box>
              <DemandDetails demandDetails={demand} />
            </Box>
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <Meta demandDetails={demand} height={"100%"} />
            </Box>
          </Stack>

          <Box sx={{ width: "60%", overflowY: "auto" }}>
            <Meta demandDetails={demand} height={"100%"} />
          </Box>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Meta demandDetails={demand} height={"100%"} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Demand;
