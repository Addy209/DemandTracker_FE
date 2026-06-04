import { Avatar, Box, Divider, Stack, Typography, useTheme } from "@mui/joy";
import React from "react";
import {
  GrProjects,
  GrAttachment,
  GrCheckmark,
  GrSettingsOption,
} from "react-icons/gr";
import { useActiveIndexStore, useUserStore } from "../store/state";
import UserProfile from "./Modals/UserProfile";

const menuItems = [
  { icon: <GrProjects size={14} />, label: "Demands" },
  { icon: <GrAttachment size={14} />, label: "All Files" },
  { icon: <GrCheckmark size={14} />, label: "Completed" },
  { icon: <GrSettingsOption size={14} />, label: "Settings" },
];

const SideBar = () => {
  const theme = useTheme();
  //   const [activeIndex, setActiveIndex] = React.useState(0);
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const { user } = useUserStore();
  console.log(user);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <Stack direction="column" textColor="inherit" sx={{ height: "100%" }}>
      <Box sx={{ p: 3 }}>
        <Typography
          level="h3"
          sx={{
            fontFamily: "'DM Serif Display', monospace;",
            fontWeight: "100",
          }}
        >
          <span style={{ color: "#38bdf8" }}>◈</span> Workplane
        </Typography>
      </Box>
      <Stack
        direction="column"
        sx={{ p: 2, height: "100%" }}
        justifyContent={"space-between"}
      >
        <Stack direction="column" sx={{ gap: 2 }} alignItems="center">
          {menuItems.map((item, index) => (
            <Typography
              level="body-md"
              key={index}
              onClick={() => handleMenuClick(index)}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  activeIndex === index ? "#1a1d28" : "transparent",
                color: activeIndex === index ? "inherit" : "",
                scale: activeIndex === index ? "1.1" : "1",
                transition: "all 0.2s ease-in-out",
                width: "90%",
                p: 1,
                borderRadius: "0.5rem",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}&nbsp;{item.label}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack sx={{ gap: 1, mb: 2 }} alignItems="center">
        <Divider sx={{ height: "2px" }} />
        <Stack direction="row" sx={{ mt: 2 }}>
          <Avatar color="warning" size="lg" src="/minato.jpg" />
          <Stack direction="column" alignItems={"flex-start"} sx={{ ml: 1 }}>
            <Typography level="body-sm" sx={{ color: "inherit" }}>
              {user?.name || "User"}
            </Typography>

            <Typography
              level="body-xs"
              sx={{ color: "#38bdf8", cursor: "pointer" }}
              onClick={() => setProfileOpen(true)}
            >
              View Profile
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {profileOpen && (
        <UserProfile open={profileOpen} setOpen={setProfileOpen} user={user} />
      )}
    </Stack>
  );
};

export default SideBar;
