import { Stack } from "@mui/joy";
import React from "react";
import Header from "../components/Header";

const Demand = () => {
  return (
    <Stack sx={{ width: "100%", height: "100dvh" }}>
      <Header
        pageTitle="Demands"
        pageSubTitle="Organise and Excel"
        pageIndex={1}
      />
    </Stack>
  );
};

export default Demand;
