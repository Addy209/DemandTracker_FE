import { Stack, Typography, useTheme, Box } from "@mui/joy";
import React from "react";

const StatCards = ({ title, value, accentColor }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      sx={{
        width: "25%",
        height: "max-content",
        position: "relative",
        p: 2,
        gap: 1,
        backgroundColor: theme.palette.background.surface,
        border: `1px solid ${theme.palette.border.primary}`,
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <Typography
        level="h2"
        sx={{
          fontFamily: "'DM Serif Display', monospace;",
          fontWeight: "100",
          fontSize: "2rem",
          color: accentColor,
        }}
      >
        {value}
      </Typography>
      <Typography
        level="body-sm"
        sx={{
          fontWeight: "100",
          color: theme.vars.palette.text.secondary,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: "100%",
          backgroundColor: accentColor,
        }}
      ></Box>
    </Stack>
  );
};

export default StatCards;
