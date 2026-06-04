import { Stack } from "@mui/joy";
import React from "react";
import Header from "../components/Header";

const AllDocuments = () => {
  return (
    <Stack sx={{ width: "100%", height: "100dvh" }}>
      <Header
        pageTitle="All Documents"
        pageSubTitle="Access and manage all your documents in one place"
      />
    </Stack>
  );
};

export default AllDocuments;
