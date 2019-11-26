import React, { useState } from "react";
import { Box, Button, Form, FormField, Heading, ThemeContext } from "grommet";
import { Dropzone } from "./Dropzone";
import { fileUpload } from "../utils";

export const MyForm = () => {
  const [files, setFiles] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // The addFiles and deleteFiles functions ensure that the files that will be
  // submitted by the form stay aligned with the files present in the dropzone.
  // Be sure to include these functions with the onAddFiles and onDeleteFiles
  // props of the Dropzone if you intend to use file uploading.
  const addFiles = newFiles => {
    setFiles(...files, newFiles);
  };

  const deleteFiles = remainingFiles => {
    setFiles(remainingFiles);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // You will need to update ../utils/fileUpload with the correct url for
    // where the data will be sent to.
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
            {/* In order to utilize fileUpload, you need to provide
             * the onAddFiles and onDeleteFiles props and their associated functions
             */}
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
