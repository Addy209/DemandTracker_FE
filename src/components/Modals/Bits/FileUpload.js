import React, { useState } from "react";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { FaFileUpload } from "react-icons/fa";
import { Box, Input, Stack, useTheme } from "@mui/joy";
import { IoMdClose } from "react-icons/io";

export default function FileUpload(props) {
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [view, setView] = React.useState(false);

  // Handle file selection from the native file dialog
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Append new files to our existing state array
      setSelectedFiles((prevFiles) => {
        props.updater(props.index, [...prevFiles, ...files]);
        return [...prevFiles, ...files];
      });
    }
  };

  // Remove a specific file from the list before upload
  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const newValue = prevFiles.filter((_, index) => index !== indexToRemove);
      props.updater(props.index, newValue);
      return newValue;
    });
  };

  return (
    <Sheet
      sx={{
        width: "100%",
        mt: 2,
        mx: "auto",
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Box sx={{ width: "25%", display: "flex", justifyContent: "center" }}>
          <Typography level="title-md">{props.fieldName}</Typography>
        </Box>
        <Box>
          <Typography level="h4" component="title-lg" mb={2}>
            &nbsp;:&nbsp;
          </Typography>
        </Box>

        {/* Styled File Upload Button wrapping the hidden native input */}
        <Box sx={{ width: "75%", display: "flex", position: "relative" }}>
          <Button
            variant="outlined"
            color="neutral"
            component="label"
            tabIndex={-1}
            sx={{
              width: "80%",
              borderStyle: "solid",
              p: 2,
              backgroundColor: theme.palette.button.primary,
            }}
          >
            <FaFileUpload fontSize={"1rem"} />
            {props.multiple ? "Upload Documents" : "Upload Document"}
            <input
              type="file"
              multiple={props.multiple}
              onChange={handleFileChange}
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
            />
          </Button>
          &nbsp;
          <Button
            variant="outlined"
            color="neutral"
            component="label"
            tabIndex={-1}
            sx={{
              width: "20%",
              borderStyle: "solid",
              p: 2,
              backgroundColor: theme.palette.button.primary,
            }}
            onClick={() => {
              setView(!view);
            }}
          >
            {selectedFiles.length} files
          </Button>
          <Box
            sx={{
              position: "absolute",
              top: "2.5rem",
              left: "50%",
              width: "75%",
              zIndex: 10,
            }}
          >
            {selectedFiles.length > 0 && view ? (
              <List
                sx={{
                  mt: 2,
                  bgcolor: "background.surface",
                  borderRadius: "sm",
                  overflow: "scroll",
                  scrollbarWidth: "none",
                  maxHeight: "20vh",
                }}
              >
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={`${file.name}-${index}`}
                    // endAction={

                    // }
                  >
                    <ListItemContent>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        width={"100%"}
                        gap={1}
                      >
                        <Box sx={{ width: "90%" }}>
                          <Typography
                            level="title-sm"
                            sx={{ whiteSpace: "wrap", wordBreak: "break-word" }}
                          >
                            {file.name}
                          </Typography>
                          <Typography
                            level="body-xs"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            ({(file.size / 1024).toFixed(1)} KB)
                          </Typography>
                        </Box>
                        <Box sx={{ width: "10%" }}>
                          <IconButton
                            variant="plain"
                            color="danger"
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <IoMdClose />
                          </IconButton>
                        </Box>
                      </Stack>
                    </ListItemContent>
                  </ListItem>
                ))}
              </List>
            ) : null}
          </Box>
        </Box>
      </Stack>

      {/* Scannable File List Preview */}
    </Sheet>
  );
}
