import { Box, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import { CgAttachment } from "react-icons/cg";
import { accentColor } from "../utils/constants";
import DOMPurify from "dompurify";
import { getTextFromHTML } from "../utils/utilFunc";

const colorMapper = {
  1: 0,
  2: 3,
  3: 1,
  4: 1,
  5: 2,
};

const priorityMapper = {
  Low: 1,
  Medium: 3,
  High: 4,
  Critical: 6,
};

const DemandCard = ({
  title,
  subtitle,
  projectId,
  status,
  priority,
  cr,
  filesCount,
  createdAt,
  color,
  statusId,
}) => {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{
        p: 2,
        width: "100%",
        border: `1px solid ${theme.palette.border.primary}`,
        borderRadius: "1rem",
        position: "relative",
        overflow: "hidden",
        height: "22vh",
        cursor: "pointer",
        backgroundColor: theme.palette.background.surface,
        justifyContent: "space-between",
      }}
      onClick={() => {
        console.log(title);
      }}
    >
      <Box
        sx={{
          height: "2px",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: color,
          width: "100%",
        }}
      ></Box>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          level="body-xs"
          sx={{ color: theme.palette.text.secondary }}
        >
          {projectId}
        </Typography>
        <Typography
          level="body-xs"
          sx={{
            // color: theme.palette.text.secondary,
            py: 0.5,
            px: 1,
            border: `1px solid ${accentColor[colorMapper[statusId]]}`,
            color: accentColor[colorMapper[statusId]],
            backgroundColor: `${accentColor[colorMapper[statusId]]}1F`,
            borderRadius: "1rem",
            fontSize: "10px",
          }}
        >
          <Box
            sx={{
              height: "6px",
              width: "6px",
              borderRadius: "50%",
              backgroundColor: accentColor[colorMapper[statusId]],
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mr: "5px",
            }}
          ></Box>
          {status}
        </Typography>
      </Stack>
      <Stack direction="column" sx={{}}>
        <Typography
          level="body-sm"
          sx={{
            color: theme.palette.text.primary,
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {title ? title : null}
        </Typography>
        <Typography
          level="body-xs"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {getTextFromHTML(subtitle)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Typography
            level="body-xs"
            sx={{
              py: 0.5,
              px: 1,
              border: `1px solid ${accentColor[priorityMapper[priority]]}`,
              color: accentColor[priorityMapper[priority]],
              backgroundColor: `${accentColor[priorityMapper[priority]]}1F`,
              borderRadius: "1rem",
              fontSize: "10px",
            }}
          >
            {priority}
          </Typography>
          <Typography
            level="body-xs"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            🗓️ {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Typography
            level="body-xs"
            sx={{
              color: theme.palette.text.secondary,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {cr ? `💼${cr}` : null}
          </Typography>
          <Typography
            level="body-xs"
            sx={{
              color: theme.palette.text.secondary,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <CgAttachment color="steelblue" />
            {filesCount}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DemandCard;
