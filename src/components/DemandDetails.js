import {
  Box,
  Grid,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import { useStatus } from "../store/state";

const DemandDetails = ({ demand }) => {
  const theme = useTheme();
  console.log(demand);
  const { status } = useStatus();

  const style = {
    width: "18ch",
    backgroundColor: theme.palette.background.level1,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.primary}`,
  };

  return (
    <Sheet
      sx={{
        backgroundColor: theme.palette.background.surface,
        color: theme.palette.text.primary,
        p: 1,
        position: "relative",
        border: `1px solid ${theme.palette.border.primary}`,
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: "100%",
          backgroundColor: demand.accentColor,
        }}
      />
      <Typography level="title-lg" sx={{ textDecoration: "underline" }}>
        Demand Details
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          width: "100%",
        }}
      >
        <Grid xs={12} sm={12} md={6} lg={3} alignSelf={"center"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography level="title-md">Status:</Typography>&nbsp;
            <Select
              size="sm"
              placeholder={"Change Status"}
              defaultValue={demand.status}
              onChange={(e, value) => {
                // props.setValue(value);
              }}
              sx={{
                ...style,
                py: 0,
                "&:hover": {
                  ...style,
                  backgroundColor: theme.palette.background.surface,
                },
              }}
              slotProps={{
                listbox: {
                  sx: {
                    p: 0,
                    '&[role="option"]:hover': {
                      ...style,
                      backgroundColor: theme.palette.background.surface,
                    },
                  },
                },
              }}
              variant="solid"
              color="neutral"
            >
              {Object.keys(status).map((item) => {
                console.log(demand.status, item);

                return (
                  <Option
                    value={parseInt(item)}
                    key={item}
                    sx={{
                      ...style,
                      "&.MuiOption-highlighted": {
                        ...style,
                        backgroundColor: theme.palette.background.surface,
                      },

                      '&.MuiOption-highlighted:not([aria-selected="true"])': {
                        ...style,
                        backgroundColor: theme.palette.background.surface,
                      },

                      "&.Mui-selected": {
                        ...style,
                        backgroundColor: theme.palette.background.body,
                      },
                    }}
                  >
                    {status[item]}
                  </Option>
                );
              })}
            </Select>
          </Stack>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} alignSelf={"center"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography level="title-md">Priority:</Typography>&nbsp;
            <Typography level="body-md">
              {demand.priority ? demand.priority : "Not Available"}
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} alignSelf={"center"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography level="title-md">TFS-CR:</Typography>&nbsp;
            <Typography level="body-md">
              {demand.cr ? demand.cr : "Not Available"}
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} alignSelf={"center"}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography level="title-md">Created At:</Typography>&nbsp;
            <Typography level="body-md">
              {demand.createdAt
                ? new Date(demand.createdAt).toDateString()
                : "Not Available"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default DemandDetails;
