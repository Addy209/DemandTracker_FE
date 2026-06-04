import { Stack } from "@mui/joy";
import React from "react";
import Header from "../components/Header";

const Completed = () => {
  return (
    <Stack sx={{ width: "100%", height: "100dvh" }}>
      <Header pageTitle="Completed" pageSubTitle="View your completed tasks" />
    </Stack>
  );
};

export default Completed;
