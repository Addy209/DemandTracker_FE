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

const StatusSaveForm = ({ data }) => {
  const theme = useTheme();
  const current = StatusFileMapper[data.value];
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
  console.log(data, formValues);

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
              console.log(formValues);
            }}
          >
            Confirm
          </Button>
          <Button variant="solid">Cancel</Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default StatusSaveForm;
