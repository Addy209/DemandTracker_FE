import { Stack, Typography, useTheme } from "@mui/joy";
import React from "react";

const ProfileDetails = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <Typography
        level="title-md"
        sx={{ color: theme.vars.palette.text.primary }}
      >
        {title}:&nbsp;
      </Typography>
      <Typography
        level="body-md"
        sx={{ color: theme.vars.palette.text.primary }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default ProfileDetails;
