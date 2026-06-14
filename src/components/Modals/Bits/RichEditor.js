import React from "react";
import { MAX_CAHRACTERS_IN_DEMAND_CREATE } from "../../../utils/constants";
import { FaItalic, FaBold, FaUnderline } from "react-icons/fa";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/joy";

const RichEditor = ({ setValue, width, placeholder }) => {
  const theme = useTheme();
  const [charCount, setCharCount] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const textareaRef = React.useRef(null);

  const handleInput = (e) => {
    const text = e.currentTarget.textContent.trim();
    setIsEmpty(text === "");
    setCharCount(text.length);
    setValue(textareaRef.current.innerHTML);
  };

  const formatText = (command) => {
    // textareaRef.current?.focus();
    // document.execCommand(command);
    // props.setValue(textareaRef.current.innerHTML);
    const selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const strong = document.createElement(command);
    strong.appendChild(range.extractContents());
    range.insertNode(strong);
    setValue(textareaRef.current.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const selection = window.getSelection();

    const selectedText = selection.toString();
    console.log(selectedText.length);
    setCharCount(text.length + charCount - selectedText.length);
    setValue(textareaRef.current.innerHTML);

    setIsEmpty(false);
    // document.execCommand("insertText", false, text);
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    // const text = e.currentTarget.textContent.trim();
    // console.log(text);
  };

  const style = {
    width: width,
    backgroundColor: theme.palette.background.level1,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.primary}`,
  };

  return (
    <Stack
      direction="column"
      gap={0}
      sx={{ position: "relative", width: "100%" }}
    >
      <Box
        contentEditable={true}
        // component={Textarea}
        ref={textareaRef}
        suppressContentEditableWarning={true}
        placeholder={placeholder}
        onPaste={(e) => {
          handlePaste(e);
        }}
        onInput={(e) => {
          handleInput(e);
        }}
        sx={{
          ...style,
          height: "25dvh",
          width: "100%",
          maxHeight: "25dvh",
          overflowY: "scroll",
          borderRadius: "0.5rem",
          // p: 1,
          padding: "0.5rem 0.5rem 2.5rem 0.5rem",
          "&::before": {
            content: `"Demand Description"`,
            display: isEmpty ? "block" : "none",
            position: "absolute",
            top: 8,
            left: 8,
            color: theme.palette.text.secondary,
            pointerEvents: "none",
          },

          scrollbarWidth: "none",
          scrollbarColor: "#888 #f1f1f1",
        }}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={1}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          p: 0.3,
          backgroundColor: theme.palette.background.body,
          width: "100%",
          mb: 0.1,
          borderBottomRightRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.surface,
            px: 1,
            borderRadius: "0.5rem",
          }}
        >
          <Typography
            level="body-xs"
            sx={{
              color:
                charCount > MAX_CAHRACTERS_IN_DEMAND_CREATE
                  ? "red"
                  : theme.palette.text.secondary,
            }}
          >
            {`${charCount}/${MAX_CAHRACTERS_IN_DEMAND_CREATE}`} used
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{
              color: theme.palette.button.primary,
              border: "2px solid " + theme.palette.border.primary,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.background.surface,
                color: theme.palette.text.primary,
              },
            }}
            onClick={() => {
              formatText("strong");
            }}
            size="sm"
          >
            <FaBold />
          </IconButton>
          <IconButton
            sx={{
              color: theme.palette.button.primary,
              border: "2px solid " + theme.palette.border.primary,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.background.surface,
                color: theme.palette.text.primary,
              },
            }}
            onClick={() => {
              formatText("em");
            }}
            size="sm"
          >
            <FaItalic />
          </IconButton>
          <IconButton
            sx={{
              color: theme.palette.button.primary,
              border: "2px solid " + theme.palette.border.primary,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.background.surface,
                color: theme.palette.text.primary,
              },
            }}
            onClick={() => {
              formatText("u");
            }}
            size="sm"
          >
            <FaUnderline />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RichEditor;
