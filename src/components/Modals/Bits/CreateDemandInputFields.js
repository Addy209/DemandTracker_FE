import {
  Box,
  ButtonGroup,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import "./bits.css";
import { accentColor } from "../../../utils/constants";
import { FaItalic, FaBold, FaUnderline } from "react-icons/fa";

const CreateDemandInputFields = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState("");
  const [isEmpty, setIsEmpty] = React.useState(true);
  const textareaRef = React.useRef(null);

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
    props.setValue(textareaRef.current.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    setIsEmpty(false);
    // document.execCommand("insertText", false, text);
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    props.setValue(textareaRef.current.innerHTML);
  };
  const style = {
    width: props.width,
    backgroundColor: theme.palette.background.level1,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.primary}`,
  };
  // console.log(value);

  if (props.type === "color") {
    return (
      <Stack direction="row" gap={1} alignItems="center">
        <Stack>
          <Typography
            level="body-md"
            sx={{ color: theme.palette.text.secondary }}
          >
            Pick an Accent Colour:
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {accentColor.map((color, index) => (
            <Box
              key={index}
              onClick={() => {
                props.setValue(color);
              }}
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: color,
                cursor: "pointer",
                border: props.value === color ? "3px solid white" : "none",
              }}
            ></Box>
          ))}
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.level1,
              borderRadius: "2rem",
              px: 2,
              height: "100%",
            }}
          >
            <Input
              type="color"
              onChange={(e) => {
                props.setValue(e.target.value);
              }}
              size="sm"
              sx={{
                width: "90px",
                height: "40px",
                p: 0,
                backgroundColor: theme.palette.background.level1,
                cursor: "pointer",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                "--Input-focusedThickness": "0px",
                "&:focus-within": {
                  boxShadow: "none",
                  borderWidth: "1px",
                  borderColor: "inherit",
                },
              }}
            />
            <Typography
              level="body-sm"
              sx={{ color: theme.palette.text.secondary, px: 1 }}
            >
              {props.value}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  if (props.type === "select") {
    return (
      <Select
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e, value) => {
          props.setValue(value);
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
        {props.options.map((item, index) => (
          <Option
            value={item}
            key={index}
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
            {item}
          </Option>
        ))}
      </Select>
    );
  }
  if (props.type === "textarea") {
    return (
      <Stack direction="column" gap={1} sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", bottom: 0, right: "1rem", p: 0.5 }}>
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
          >
            <FaUnderline />
          </IconButton>
        </Box>
        <Box
          contentEditable={true}
          // component={Textarea}
          ref={textareaRef}
          suppressContentEditableWarning={true}
          placeholder={props.placeholder}
          onPaste={(e) => {
            handlePaste(e);
          }}
          onInput={(e) => {
            setIsEmpty(e.currentTarget.textContent.trim() === "");
            props.setValue(textareaRef.current.innerHTML);
          }}
          sx={{
            ...style,
            height: "20dvh",
            maxHeight: "20dvh",
            overflowY: "scroll",
            borderRadius: "0.5rem",
            p: 1,
            "&::before": {
              content: `"Demand Description"`,
              display: isEmpty ? "block" : "none",
              position: "absolute",
              top: 8,
              left: 8,
              color: theme.palette.text.secondary,
              pointerEvents: "none",
            },
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.background.body,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c73636",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },

            scrollbarWidth: "none",
            scrollbarColor: "#888 #f1f1f1",
          }}
        />
      </Stack>
    );
  }
  return (
    <Input
      type={props.type}
      placeholder={props.placeholder}
      sx={style}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
};

export default CreateDemandInputFields;
