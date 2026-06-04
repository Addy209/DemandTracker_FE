import { Input, useTheme, Box } from "@mui/joy";
import React from "react";
import { LiaSearchSolid } from "react-icons/lia";

const SearchBar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "50%",
        // position: "relative"
      }}
    >
      <Input
        type="search"
        sx={{
          width: "100%",
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.border.primary}`,
        }}
        placeholder="Seach by Name or ID"
        startDecorator={<LiaSearchSolid />}
        size="md"
      />
      {/* <Box sx={{ position: "absolute" }}>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
        <p>Test</p>
      </Box> */}
    </Box>
  );
};

export default SearchBar;
