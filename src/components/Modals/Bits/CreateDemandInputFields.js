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
import {
  accentColor,
  MAX_CAHRACTERS_IN_DEMAND_CREATE,
} from "../../../utils/constants";
import { FaItalic, FaBold, FaUnderline } from "react-icons/fa";
import RichEditor from "./RichEditor";

const CreateDemandInputFields = (props) => {
  const theme = useTheme();
  const [charCount, setCharCount] = React.useState(0);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const textareaRef = React.useRef(null);

  const handleInput = (e) => {
    const text = e.currentTarget.textContent.trim();
    setIsEmpty(text === "");
    setCharCount(text.length);
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
    return <RichEditor {...props} />;
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
