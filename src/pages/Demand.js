import { IconButton, Stack, useTheme } from "@mui/joy";
import React from "react";
import Header from "../components/Header";
import { useDemands } from "../store/state";
import { TiArrowBack } from "react-icons/ti";
import HeaderWithBackButton from "../components/HeaderWithBackButton";
import DemandDetails from "../components/DemandDetails";

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
      <Stack sx={{ pl: 8, pr: 3, pt: 1 }}>
        <DemandDetails demand={demand} />
      </Stack>
    </Stack>
  );
};

export default Demand;
