import React from "react";
import {
  DETAIL,
  DOCUMENT,
  DOCUMENTS,
  StatusFileMapper,
} from "../../../utils/constants";
import { Box, Button, ButtonGroup, Input, Stack, useTheme } from "@mui/joy";
import FileUpload from "./FileUpload";
import MetaInputForConfirmSave from "./MetaInputForConfirmSave";
import { updateStatus } from "../../../utils/APIs/project";
import { fetchStatusFileMapping } from "../../../utils/APIs/statusfilemapper";
import { useStatusFileMapping } from "../../../store/state";

const StatusSaveForm = ({ data, setOpen }) => {
  const theme = useTheme();
  const { StatusFileMapping } = useStatusFileMapping();
  const current = StatusFileMapping[data.value];
  const stateDefaultValue = current.map((val) => {
    return {
      fieldName: val.name,
      type: val.type,
      fieldValue: null,
    };
  });
  const [formValues, setFormValues] = React.useState([...stateDefaultValue]);
  const dataUpdater = (index, value) => {
    setFormValues((prev) => {
      let newArr = [...prev];
      newArr[index].fieldValue = value;

      return newArr;
    });
  };

  const handleStatusSave = async () => {
    let submitData = {
      projectId: data.projectId,
      newStatus: data.value,
    };
    const fd = new FormData();
    for (let val of formValues) {
      val["fileCount"] = val.fieldValue.length;
      for (let file of val.fieldValue) {
        fd.append("files", file);
      }
      //   console.log(fd.entries());
    }
    submitData["additionalDetails"] = formValues;
    console.log(submitData);
    fd.append("data", JSON.stringify(submitData));
    const result = await updateStatus(fd);
    // console.log(result);
  };

  return (
    <Stack direction={"column"} width={"100%"}>
      {current.map((val, index) => {
        switch (val.type) {
          case DETAIL: {
            return (
              <MetaInputForConfirmSave
                key={index}
                index={index}
                height="20vh"
                fieldName={val.name}
                fieldNameDisabled={true}
                updater={dataUpdater}
                placeholder={"Enter the value of " + val.name}
              />
            );
          }
          case DOCUMENT: {
            return (
              <FileUpload
                key={index}
                index={index}
                fieldName={val.name}
                updater={dataUpdater}
                type={DOCUMENT}
              />
            );
          }
          case DOCUMENTS: {
            return (
              <FileUpload
                key={index}
                index={index}
                fieldName={val.name}
                updater={dataUpdater}
                multiple={true}
                type={DOCUMENTS}
              />
            );
          }
          default: {
            return null;
          }
        }
      })}
      <Stack direction={"row"} justifyContent={"center"}>
        <ButtonGroup sx={{ mt: 2 }}>
          <Button
            sx={{
              backgroundColor: theme.palette.button.primary,
              "&:hover": {
                backgroundColor: theme.palette.button.primary,
              },
            }}
            onClick={() => {
              handleStatusSave();
            }}
          >
            Confirm
          </Button>
          <Button variant="solid" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default StatusSaveForm;
