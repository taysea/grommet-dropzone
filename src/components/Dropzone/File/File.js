import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "grommet";
import { FormClose } from "grommet-icons";
import { FileInfo } from "./FileInfo";

export const File = ({ file, removeFile, showPreview, showSize, ...rest }) => {
  return (
    <Box direction="row" align="center" justify="between" {...rest}>
      <FileInfo file={file} showSize={showSize} showPreview={showPreview} />
      <RemoveButton file={file} removeFile={removeFile} />
    </Box>
  );
};

const RemoveButton = ({ file, removeFile }) => (
  <Button
    a11yTitle={`remove ${file.path}`}
    icon={<FormClose />}
    hoverIndicator
    onClick={() => removeFile(file)}
  />
);

File.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  showPreview: PropTypes.bool,
  showSize: PropTypes.bool,
  removeFile: PropTypes.func.isRequired
};

File.defaultProps = {
  showPreview: false,
  showSize: false
};
