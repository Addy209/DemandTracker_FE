import React from "react";
import {
  Modal,
  Sheet,
  Typography,
  ModalClose,
  Input,
  Button,
  useTheme,
} from "@mui/joy";
import { createOrUpdateUser, pingToCheckUser } from "../../utils/APIs/user";
import { CREATE } from "../../utils/constants";
import { useUserStore } from "../../store/state";

const UserAdd = ({ setProceed, setProceedFurther }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const { user, setUser } = useUserStore();
  const theme = useTheme();
  React.useEffect(() => {
    const checkUser = async () => {
      const response = await pingToCheckUser();
      response.proceed ? setOpen(!response.status) : setProceed(false);
      if (response.status) {
        setUser(response.payload);
        if (response.payload.isActive) setProceedFurther(true);
      }
    };
    checkUser();
  }, []);

  const handleSubmit = async () => {
    if (name.trim() === "") return;
    const response = await createOrUpdateUser(name, CREATE);
    response.proceed ? setOpen(false) : setProceed(false);
    if (response.status) {
      setUser(response.payload);
      if (response.payload.isActive) setProceedFurther(true);
    }
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
          width: 660,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          backgroundColor: theme.vars.palette.background.surface,
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
        <Typography
          component="h4"
          id="modal-title"
          level="title-lg"
          sx={{
            // fontWeight: "lg",
            mb: 1,
            color: "whitesmoke",
            fontWeight: "300",
          }}
        >
          Looks like your debut visit🎉! What should we call you?
        </Typography>
        <Input
          placeholder="Enter your name..."
          variant="outlined"
          size="lg"
          sx={{
            backgroundColor: theme.vars.palette.background.level1,
            color: "whitesmoke",
            width: "100%",
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          variant="solid"
          size="md"
          sx={{
            mt: 2,
            backgroundColor: theme.vars.palette.button.primary,
            color: theme.vars.palette.text.tertiary,
            fontWeight: "300",
            "&:hover": {
              color: theme.vars.palette.text.primary,
            },
            // color: "#13151e",
            // width: "100%",
          }}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Sheet>
    </Modal>
  );
};

export default UserAdd;
