import {
  Button,
  ButtonGroup,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import { CR, EEC_DONE, EEC_PD, STATUS } from "../../utils/constants";
import StatusSaveForm from "./Bits/StatusSaveForm";

const ConfirmSave = ({ open, setOpen, data }) => {
  const theme = useTheme();
  console.log(data);
  const getDisplayMessage = (type, value) => {
    const label =
      type === CR
        ? "CR Number"
        : type === EEC_DONE
          ? "EEC Done"
          : type === EEC_PD
            ? "EEC PD"
            : type === STATUS
              ? "Project Status"
              : "";
    return (
      <>
        <Typography level="title-md">{`Confirm to save the detail.`}</Typography>
        <Typography level="title-sm">
          {" "}
          Set the value of{" "}
          <span
            style={{
              color: "orange",
              textDecoration: "underline",
              fontSize: "1rem",
              fontWeight: "bolder",
            }}
          >
            {label}
          </span>{" "}
          to{" "}
          <span
            style={{
              color: "lightblue",
              textDecoration: "underline",
              fontSize: "1rem",
              fontWeight: "bolder",
            }}
          >
            {value}
          </span>
          ?
        </Typography>
      </>
    );
  };

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
          width: data.type === STATUS ? "70dvw" : 400,
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
        <Stack
          direction="column"
          alignItems="flex-start"
          sx={{ gap: 1, width: "100%" }}
        >
          <Stack
            direction="column"
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data.type === STATUS && data.value > 1 ? (
              <StatusSaveForm data={data} setOpen={setOpen} />
            ) : (
              <>
                {getDisplayMessage(
                  data.type,
                  data.label ? data.label : data.value,
                )}
                <ButtonGroup sx={{ mt: 2 }}>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.button.primary,
                      "&:hover": {
                        backgroundColor: theme.palette.button.primary,
                      },
                    }}
                  >
                    Confirm
                  </Button>
                  <Button variant="solid" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </>
            )}
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default ConfirmSave;
