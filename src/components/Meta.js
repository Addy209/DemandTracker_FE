import React from "react";
import { getMetaListByProjectId } from "../utils/APIs/meta";
import { Box, Sheet, useTheme } from "@mui/joy";

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
        }}
      >
        {metaList.map((item) => {
          return (
            <div>
              <p>{item.fieldName}</p>
              <p>{item.fieldValue}</p>
            </div>
          );
        })}
      </Box>
    </Sheet>
  );
};

export default Meta;
