import {
  Box,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import { useStatus } from "../store/state";
import { getDemandById } from "../utils/APIs/project";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  COMPLETED_VALUE,
  CR,
  EEC_DONE,
  EEC_PD,
  STATUS,
  UAT_START_VALUE,
} from "../utils/constants";
import { FaCheck } from "react-icons/fa";
import ConfirmSave from "./Modals/ConfirmSave";

const DemandDetails = ({ demandDetails }) => {
  const theme = useTheme();
  const [demand, setDemand] = React.useState(demandDetails);
  const { status } = useStatus();
  const [projectStatus, setProjectStatus] = React.useState(
    demandDetails.status,
  );
  const [projectCR, setProjectCR] = React.useState(null);
  const [projectEecDone, setProjectEecDone] = React.useState(null);
  const [projectEecPd, setProjectEecPd] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({
    value: "",
    type: "",
  });

  React.useEffect(() => {
    const fetchDemandDetails = async (id) => {
      const result = await getDemandById(id);
      if (result.status) setDemand(result.payload);
    };
    fetchDemandDetails(demand.projectId);
  }, []);

  const style = {
    width: "100%",
    backgroundColor: theme.palette.background.level1,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.primary}`,
  };

  const EECOptions = {
    Yes: true,
    No: false,
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

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ px: 1 }}
      >
        <Box>
          <Typography level="title-md" sx={{ textDecoration: "underline" }}>
            Demand Details:
          </Typography>
        </Box>
        <Box>
          <Tooltip
            title="Important Dates"
            placement="left"
            size="sm"
            arrow
            variant="solid"
          >
            <IconButton
              sx={{
                transition: "scale 0.2s ease-in",
                "&:hover": {
                  backgroundColor: "transparent",
                  scale: 0.9,
                },
              }}
              size="lg"
            >
              <BsFillCalendarDateFill
                color={theme.palette.text.primary}
                fontSize={"1.2rem"}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          py: 2,
          px: 3,
          width: "100%",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            sx={{ width: "30%" }}
          >
            <Typography level="title-md">Status</Typography>
          </Stack>
          &nbsp;:&nbsp;
          <Box sx={{ width: "70%" }}>
            {demand.status === parseInt(COMPLETED_VALUE) ? (
              <Typography level="body-md">demand.statusName</Typography>
            ) : (
              <Stack direction={"row"} width={"100%"} gap={1}>
                <Select
                  size="sm"
                  placeholder={"Change Status"}
                  defaultValue={projectStatus}
                  value={projectStatus}
                  onChange={(e, value) => {
                    const diff = value - projectStatus;
                    if (diff === 1) {
                      setProjectStatus(value);
                    } else {
                      alert("Please Go Sequentially");
                      e.preventDefault();
                    }
                    // console.log(diff, value, projectStatus);
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
                    // console.log(demand.status, item);

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

                          '&.MuiOption-highlighted:not([aria-selected="true"])':
                            {
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
                <IconButton
                  sx={{
                    width: "10%",
                    backgroundColor: theme.palette.button.primary,
                    borderRadius: "0.5rem",
                  }}
                  size="sm"
                  onClick={() => {
                    setModalData((prev) => ({
                      type: STATUS,
                      value: projectStatus,
                      label: status[projectStatus],
                    }));
                    setOpen(projectStatus ? true : false);
                  }}
                >
                  <FaCheck />
                </IconButton>
              </Stack>
            )}
          </Box>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            sx={{ width: "30%" }}
          >
            <Typography level="title-md">Priority</Typography>
          </Stack>
          &nbsp;:&nbsp;
          <Box
            sx={{ width: "70%", display: "flex", justifyContent: "flex-start" }}
          >
            <Typography level="body-md">
              {demand.priority ? demand.priority : "Not Available"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            sx={{ width: "30%" }}
          >
            <Typography level="title-md">Created On</Typography>
          </Stack>
          &nbsp;:&nbsp;
          <Box
            sx={{ width: "70%", display: "flex", justifyContent: "flex-start" }}
          >
            <Typography level="body-md">
              {demand.createdAt
                ? new Date(demand.createdAt).toDateString()
                : "Not Available"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            sx={{ width: "30%" }}
          >
            <Typography level="title-md">CR Number</Typography>
          </Stack>
          &nbsp;:&nbsp;
          <Box
            sx={{ width: "70%", display: "flex", justifyContent: "flex-start" }}
          >
            {demand.cr ? (
              <Typography level="body-md">{demand.cr}</Typography>
            ) : (
              <Stack direction={"row"} width={"100%"} gap={1}>
                <Input
                  size="sm"
                  type="text"
                  placeholder="CR Number"
                  sx={{
                    ...style,
                    backgroundColor: theme.palette.background.level1,
                    color: theme.palette.text.primary,
                  }}
                  onChange={(e) => {
                    setProjectCR(e.target.value);
                  }}
                />
                <IconButton
                  sx={{
                    width: "10%",
                    backgroundColor: theme.palette.button.primary,
                    borderRadius: "0.5rem",
                  }}
                  size="sm"
                  onClick={() => {
                    setModalData((prev) => ({ type: CR, value: projectCR }));
                    setOpen(projectCR ? true : false);
                  }}
                >
                  <FaCheck />
                </IconButton>
              </Stack>
            )}
          </Box>
        </Stack>

        {demand.status > parseInt(UAT_START_VALUE) ? (
          <>
            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                sx={{ width: "30%" }}
              >
                <Typography level="title-md">EEC Done?</Typography>
              </Stack>
              &nbsp;:&nbsp;
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {demand.eecDone ? (
                  <Typography level="body-md"> Yes </Typography>
                ) : (
                  <Stack direction={"row"} width={"100%"} gap={1}>
                    <Select
                      size="sm"
                      placeholder={"Change Status"}
                      defaultValue={false}
                      onChange={(e, value) => {
                        setProjectEecDone(value);
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
                      {Object.keys(EECOptions).map((item) => {
                        return (
                          <Option
                            value={EECOptions[item]}
                            key={item}
                            sx={{
                              ...style,
                              "&.MuiOption-highlighted": {
                                ...style,
                                backgroundColor:
                                  theme.palette.background.surface,
                              },

                              '&.MuiOption-highlighted:not([aria-selected="true"])':
                                {
                                  ...style,
                                  backgroundColor:
                                    theme.palette.background.surface,
                                },

                              "&.Mui-selected": {
                                ...style,
                                backgroundColor: theme.palette.background.body,
                              },
                            }}
                          >
                            {item}
                          </Option>
                        );
                      })}
                    </Select>
                    <IconButton
                      sx={{
                        width: "10%",
                        backgroundColor: theme.palette.button.primary,
                        borderRadius: "0.5rem",
                      }}
                      size="sm"
                      onClick={() => {
                        setModalData((prev) => ({
                          type: EEC_DONE,
                          value: projectEecDone,
                          label: "Yes",
                        }));
                        setOpen(projectEecDone);
                      }}
                    >
                      <FaCheck />
                    </IconButton>
                  </Stack>
                )}
              </Box>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                sx={{ width: "30%" }}
              >
                <Typography level="title-md">EEC PD</Typography>
              </Stack>
              &nbsp;:&nbsp;
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {demand.eecPD ? (
                  <Typography level="body-md">{demand.eecPD}</Typography>
                ) : (
                  <Stack direction={"row"} width={"100%"} gap={1}>
                    <Input
                      size="sm"
                      type="text"
                      placeholder="EEC PD"
                      sx={{
                        ...style,
                        width: "90%",
                        backgroundColor: theme.palette.background.level1,
                        color: theme.palette.text.primary,
                      }}
                      onChange={(e) => {
                        setProjectEecPd(e.target.value);
                      }}
                    />
                    <IconButton
                      sx={{
                        width: "10%",
                        backgroundColor: theme.palette.button.primary,
                        borderRadius: "0.5rem",
                      }}
                      size="sm"
                      onClick={() => {
                        setModalData((prev) => ({
                          type: EEC_PD,
                          value: projectEecPd,
                        }));
                        setOpen(projectEecPd ? true : false);
                      }}
                    >
                      <FaCheck />
                    </IconButton>
                  </Stack>
                )}
              </Box>
            </Stack>
          </>
        ) : null}
      </Stack>
      {open ? (
        <ConfirmSave
          open={true}
          setOpen={setOpen}
          data={{ ...modalData, projectId: demandDetails.projectId }}
        />
      ) : null}
    </Sheet>
  );
};

export default DemandDetails;
