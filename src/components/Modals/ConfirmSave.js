import { Modal, ModalClose, Sheet, Stack, useTheme } from "@mui/joy";
import React from "react";

const ConfirmSave = ({ open, setOpen, data }) => {
  const theme = useTheme();
  console.log(data);

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
            Confirm to save. Status value to{" "}
            {data.label ? data.label : data.value}
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default ConfirmSave;
