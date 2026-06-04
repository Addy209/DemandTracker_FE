import {
  Avatar,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import ProfileDetails from "./Bits/ProfileDetails";

const UserProfile = ({ open, setOpen, user }) => {
  const theme = useTheme();
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 400,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          backgroundColor: "#13151e",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ModalClose
          variant="plain"
          sx={{
            pt: 0,
            mt: 0,
            pl: 0.5,
            color: "whitesmoke",
            "&:hover": { bgcolor: "transparent", color: "crimson" },
          }}
        />
        <br />
        <Stack direction="column" alignItems="flex-start" sx={{ gap: 1 }}>
          <Stack direction="row" width={"100%"} justifyContent={"center"}>
            <Avatar
              color="warning"
              size="lg"
              src="/minato.jpg"
              sx={{ width: "8rem", height: "8rem" }}
              quality={50}
            />
          </Stack>
          <Stack direction="column">
            <ProfileDetails title={"Name"} value={user?.name || "User"} />
            <ProfileDetails
              title={"Account Active"}
              value={user?.isActive ? "Yes" : "No"}
            />
            <ProfileDetails
              title={"IP Address"}
              value={user?.ipv4_address || "N/A"}
            />
            <ProfileDetails
              title={"Last Login"}
              value={
                user?.lastSeenAt
                  ? new Date(user.lastSeenAt).toDateString()
                  : "N/A"
              }
            />
            <ProfileDetails
              title={"Last Login At"}
              value={
                user?.lastSeenAt
                  ? new Date(user.lastSeenAt).toLocaleTimeString()
                  : "N/A"
              }
            />
            <ProfileDetails
              title={"Account Since"}
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "N/A"
              }
            />
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default UserProfile;
