import { Box, Input, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import RichEditor from "./RichEditor";

const MetaInputForConfirmSave = (props) => {
  const theme = useTheme();
  const DataUpdater = (value) => {
    console.log(props.index, value);

    props.updater(props.index, value);
  };
  return (
    <Stack direction={"row"} width={"100%"} alignItems={"center"} mt={2}>
      <Box sx={{ width: "20%", display: "flex", justifyContent: "flex-start" }}>
        <Typography level="title-md">{props.fieldName}</Typography>
      </Box>
      <Box sx={{ width: "5%", display: "flex", justifyContent: "center" }}>
        <Typography level="h4">&nbsp;:&nbsp;</Typography>
      </Box>
      <Box sx={{ width: "75%" }}>
        <RichEditor {...props} setValue={DataUpdater} />
      </Box>
    </Stack>
  );
};

export default MetaInputForConfirmSave;
