import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Box, Stack, Typography, useColorScheme, useTheme } from "@mui/joy";
import UserAdd from "./components/Modals/UserAdd";
import SideBar from "./components/SideBar";
import { useActiveIndexStore } from "./store/state";
import DemandDashboard from "./pages/DemandDashboard";
import AllDocuments from "./pages/AllDocuments";
import Completed from "./pages/Completed";
import Settings from "./pages/Settings";

function App() {
  const [proceed, setProceed] = React.useState(true);
  const [proceedFurther, setProceedFurther] = React.useState(false);
  const { activeIndex } = useActiveIndexStore();
  const { setMode } = useColorScheme();
  const theme = useTheme();
  const pages = [
    <DemandDashboard />,
    <AllDocuments />,
    <Completed />,
    <Settings />,
  ];
  React.useEffect(() => {
    setMode("light");
  }, [setMode]);
  return (
    <Stack className="App" direction="row">
      {proceed ? (
        <UserAdd
          setProceed={setProceed}
          setProceedFurther={setProceedFurther}
        />
      ) : (
        <Typography level="h1" sx={{ color: "whitesmoke" }}>
          Check Your Connectivity!
        </Typography>
      )}
      {proceedFurther ? (
        <>
          <Stack
            direction="column"
            width="14%"
            height="100dvh"
            sx={{ backgroundColor: theme.vars.palette.background.surface }}
          >
            <SideBar />
            {console.log(window.innerWidth)}
          </Stack>
          <Stack direction="column" sx={{ width: "86%", height: "100dvh" }}>
            {pages[activeIndex]}
          </Stack>
        </>
      ) : (
        <Typography level="h1" sx={{ color: "whitesmoke" }}>
          Loading...
        </Typography>
      )}
    </Stack>
  );
}

export default App;
