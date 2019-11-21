import React, { useState } from "react";
import { Box, Button, Form, FormField, Heading, ThemeContext } from "grommet";
import { Dropzone } from "./Dropzone";
import { fileUpload } from "../utils";

export const MyForm = () => {
  const [files, setFiles] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addFiles = newFiles => {
    setFiles(...files, newFiles);
  };

  const deleteFiles = remainingFiles => {
    setFiles(remainingFiles);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fileUpload({ firstName, lastName, files });
  };

  return (
    <Box
      width="medium"
      onDrop={event => event.preventDefault()} // Prevent document drop from overtaking window
    >
      <Form onSubmit={handleSubmit}>
        <Heading>Dropzone Form</Heading>
        <FormField
          label="First Name"
          htmlFor="fname"
          name="fname"
          required
          validate={{ regexp: /^[a-z]/i }}
          onChange={event => setFirstName(event.value)}
          value={firstName}
        />
        <FormField
          label="Last Name"
          name="lname"
          required
          validate={{ regexp: /^[a-z]/i }}
          onChange={event => setLastName(event.target.value)}
          value={lastName}
        />
        <ThemeContext.Extend
          value={{
            formField: {
              border: {
                color: "none"
              },
              label: {
                margin: {
                  bottom: "small"
                }
              },
              margin: {
                bottom: "medium"
              }
            }
          }}
        >
          <FormField label="Select files" name="file-upload">
            <Dropzone
              multiple
              showPreview
              showSize
              onAddFiles={addFiles}
              onDeleteFiles={deleteFiles}
            />
          </FormField>
        </ThemeContext.Extend>

        <Box align="start" direction="row" gap="xsmall">
          <Button type="submit" label="Submit" primary />
        </Box>
      </Form>
    </Box>
  );
};
