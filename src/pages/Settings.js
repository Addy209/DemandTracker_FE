import { Stack } from "@mui/joy";
import React from "react";
import Header from "../components/Header";

const Settings = () => {
  return (
    <Stack sx={{ width: "100%", height: "100dvh" }}>
      <Header pageTitle="Settings" pageSubTitle="Manage your preferences" />
    </Stack>
  );
};

export default Settings;
