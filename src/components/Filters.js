import React from "react";
import { fetchAllStatus } from "../utils/APIs/status";
import { useStatus } from "../store/state";
import { Box, Stack, Typography, useTheme } from "@mui/joy";

const Filters = () => {
  const { status, setStatus, active, setActive } = useStatus();
  const theme = useTheme();
  React.useEffect(() => {
    const fetchStatus = async () => {
      const response = await fetchAllStatus();
      if (response.proceed) setStatus(response.payload);
    };
    fetchStatus();
  }, []);
  console.log(status);

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ p: 1, justifyContent: "space-around", width: "50%" }}
    >
      <Box
        onClick={() => {
          setActive(0);
        }}
        sx={{
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          background:
            active === 0
              ? "rgba(56,189,248,0.12)"
              : theme.palette.background.level1,
          border: `1px solid ${active === 0 ? "rgba(56,189,248,0.33)" : theme.palette.border.primary}`,

          py: 0.5,
          px: 2.5,
          borderRadius: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          level="body-xs"
          sx={{
            color:
              active === 0
                ? theme.palette.button.primary
                : theme.palette.text.secondary,
            "&:hover": {
              color: active === 0 ? theme.palette.text.primary : null,
            },
          }}
        >
          All
        </Typography>
      </Box>
      {Object.keys(status).map((item) => {
        if (item === "6") {
          return;
        }
        return (
          <Box
            index={item}
            onClick={() => {
              setActive(item);
            }}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              background:
                active === item
                  ? "rgba(56,189,248,0.12)"
                  : theme.palette.background.level1,
              border: `1px solid ${active === item ? "rgba(56,189,248,0.33)" : theme.palette.border.primary}`,
              py: 0.5,
              px: 2.5,
              borderRadius: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              level="body-xs"
              sx={{
                color:
                  active === item
                    ? theme.palette.button.primary
                    : theme.palette.text.secondary,
                "&:hover": {
                  color: active === item ? theme.palette.text.primary : null,
                },
              }}
            >
              {status[item]}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default Filters;
