import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import ProfileDetails from "./Bits/ProfileDetails";
import CreateDemandInputFields from "./Bits/CreateDemandInputFields";
import { accentColor } from "../../utils/constants";
import { createProject } from "../../utils/APIs/project";
import { cleanHTMLString } from "../../utils/utilFunc";

const CreateDemand = ({ open, setOpen, user }) => {
  const theme = useTheme();
  const [demandId, setDemandId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [demandTitle, setDemandTitle] = React.useState("");
  const [demandDescription, setDemandDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [color, setColor] = React.useState(accentColor[0]);

  const handleSubmit = async () => {
    console.log(demandDescription);

    if (
      demandId &&
      projectId &&
      demandTitle &&
      demandDescription &&
      priority &&
      color
    ) {
      const purifiedData = cleanHTMLString(demandDescription);
      const demandData = {
        demandId,
        projectId,
        projectName: demandTitle,
        integrationDetails: purifiedData,
        priority,
        accentColor: color,
      };
      const result = await createProject(demandData);
      if (result.status) {
        alert("Demand Created Successfully!");
        setOpen(false);
      }
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
          width: "50vw",
          borderRadius: "md",
          p: 2,
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
          sx={{ gap: 2, width: "100%" }}
        >
          <Stack direction="row" width={"100%"} justifyContent={"flex-start"}>
            <Typography level="h4">Create a New Demand</Typography>
          </Stack>
          <Stack
            direction="row"
            width={"100%"}
            justifyContent={"space-between"}
            gap={2}
          >
            <CreateDemandInputFields
              type="text"
              placeholder={"Demand Id"}
              width="50%"
              value={demandId}
              setValue={setDemandId}
            />
            <CreateDemandInputFields
              type="text"
              placeholder="Project Id"
              width="50%"
              value={projectId}
              setValue={setProjectId}
            />
          </Stack>
          <Stack direction="column" width={"100%"} gap={2}>
            <CreateDemandInputFields
              type="text"
              placeholder="Demand Title"
              width="100%"
              value={demandTitle}
              setValue={setDemandTitle}
            />
            <CreateDemandInputFields
              type="textarea"
              placeholder="Demand Description"
              width="100%"
              value={demandDescription}
              setValue={setDemandDescription}
            />
            <CreateDemandInputFields
              type="select"
              placeholder="Priority"
              width="100%"
              options={["Low", "Medium", "High", "Critical"]}
              value={priority}
              setValue={setPriority}
            />
            <CreateDemandInputFields
              type="color"
              placeholder="Select Color"
              value={color}
              setValue={setColor}
            />
          </Stack>
          <Stack direction="row" justifyContent={"center"} gap={2} width="100%">
            <Button
              variant="solid"
              sx={{
                backgroundColor: theme.palette.button.primary,
                color: theme.palette.text.tertiary,
                "&:hover": {
                  color: theme.palette.text.primary,
                },
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Demand
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default CreateDemand;
