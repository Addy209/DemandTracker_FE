import { Box, Button, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import CreateDemand from "./Modals/CreateDemand";
import { cleanHTMLString } from "../utils/utilFunc";

const Header = ({ pageTitle, pageSubTitle, pageIndex, isHtml }) => {
  const theme = useTheme();
  const [createDemandModalOpen, setCreateDemandModalOpen] =
    React.useState(false);
  return (
    <Stack
      direction="row"
      sx={{ pt: 3, px: 3 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="column" sx={{ alignItems: "flex-start" }}>
        <Typography
          level={pageIndex === 1 ? "h4" : "h3"}
          sx={{
            fontFamily: "'DM Serif Display', monospace;",
            fontWeight: "100",
            textAlign: "justify",
          }}
        >
          {pageTitle}
        </Typography>

        {isHtml ? (
          <Box
            dangerouslySetInnerHTML={{ __html: cleanHTMLString(pageSubTitle) }}
            sx={{
              fontSize: "0.8rem",
              color: theme.palette.text.secondary,
              textAlign: "justify",
              wordBreak: "break-word",
              whiteSpace: "wrap",
            }}
          />
        ) : (
          <Typography
            level="body-xs"
            sx={{
              color: theme.vars.palette.text.secondary,
              fontWeight: "300",
              textAlign: "justify",
            }}
          >
            {pageSubTitle}
          </Typography>
        )}
      </Stack>
      {pageIndex === 0 ? (
        <Stack>
          <Button
            size="sm"
            onClick={() => {
              setCreateDemandModalOpen(true);
            }}
            sx={{
              p: 1,
              fontWeight: "500",
              backgroundColor: theme.vars.palette.button.primary,
              color: theme.vars.palette.text.tertiary,
              borderRadius: "0.5rem",
              "&:hover": {
                color: theme.vars.palette.text.primary,
              },
            }}
          >
            &nbsp;+ New Demand&nbsp;
          </Button>
        </Stack>
      ) : null}
      <CreateDemand
        open={createDemandModalOpen}
        setOpen={setCreateDemandModalOpen}
      />
    </Stack>
  );
};

export default Header;
