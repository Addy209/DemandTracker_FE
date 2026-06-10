import { Grid, Sheet, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";

const DemandDetails = ({ demand }) => {
  const theme = useTheme();
  return (
    <Sheet
      sx={{
        backgroundColor: theme.palette.background.surface,
        color: theme.palette.text.primary,
        p: 1,
      }}
    >
      <Typography level="title-lg" sx={{ textDecoration: "underline" }}>
        Demand Details
      </Typography>
      <Grid container spacing={2} sx={{ px: 2, width: "100%" }}>
        <Grid xs={12} sm={12} md={6} lg={4} key={0}>
          Status: {demand.statusName}
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} key={0}>
          Priority: {demand.priority}
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} key={0}>
          Status: {demand.statusName}
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default DemandDetails;
