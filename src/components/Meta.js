import React from "react";
import { getMetaListByProjectId } from "../utils/APIs/meta";
import {
  Box,
  Divider,
  IconButton,
  Sheet,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { cleanHTMLString } from "../utils/utilFunc";

const Meta = ({ demandDetails, height }) => {
  const [metaList, setMetaList] = React.useState([]);
  const theme = useTheme();
  React.useEffect(() => {
    const getMetaList = async (id) => {
      const response = await getMetaListByProjectId(id);
      if (response.status) setMetaList(response.payload);
    };
    getMetaList(demandDetails.projectId);
  }, []);

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
        height: height,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ px: 1 }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography level="title-md" sx={{ textDecoration: "underline" }}>
            Important Updates:
          </Typography>
        </Box>
        <Box>
          <Tooltip
            title="Add Update"
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
              size="md"
            >
              <MdOutlinePlaylistAdd
                color={theme.palette.text.primary}
                fontSize={"1.5rem"}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: "100%",
          backgroundColor: demandDetails.accentColor,
        }}
      />
      <Box
        sx={{
          overflowY: "scroll",
          height: height,
          scrollbarWidth: "none",
          scrollbarColor: "#888 #f1f1f1",
          px: 2,
          py: 1,
        }}
      >
        {metaList.map((item, index) => {
          const date = new Date(item.updatedAt);
          return (
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              py={0.5}
              key={index}
            >
              <Typography level="title-sm">{item.fieldName}:</Typography>
              <Box
                dangerouslySetInnerHTML={{
                  __html: cleanHTMLString(item.fieldValue),
                }}
                sx={{
                  fontSize: "0.9rem",
                  color: theme.palette.text.secondary,
                  textAlign: "left",
                  wordBreak: "break-word",
                  whiteSpace: "wrap",
                }}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                py={1}
                alignItems={"center"}
                width={"100%"}
              >
                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {date.toISOString().split(".")[0].replace("T", " at ")}
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Edit Update" placement="top" arrow size="sm">
                    <IconButton
                      size="sm"
                      sx={{
                        backgroundColor: "transparent",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: theme.palette.text.secondary,
                        },
                      }}
                    >
                      <RiEditFill />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete Update"
                    placement="top"
                    arrow
                    size="sm"
                  >
                    <IconButton
                      size="sm"
                      sx={{
                        backgroundColor: "transparent",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: theme.palette.text.secondary,
                        },
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              <Divider></Divider>
            </Stack>
          );
        })}
      </Box>
    </Sheet>
  );
};

export default Meta;
