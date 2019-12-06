import React from "react";
import PropTypes from "prop-types";
import { Box, Image, Text } from "grommet";
import { calculateSize, truncateText } from "../../../utils";

export const FileInfo = ({ file, showPreview, showFileSize }) => (
  <Box direction="row">
    {showPreview && (
      <Box width="xxsmall" height="xxsmall">
        <Image src={file.preview} fit="cover" />
      </Box>
    )}

    <Text margin="xsmall" weight="bold">
      {truncateText(file.name)}
    </Text>
    {showFileSize && (
      <Text margin="xsmall">
        {calculateSize(file.size).value.toFixed(1)}{" "}
        {calculateSize(file.size).suffix}
      </Text>
    )}
  </Box>
);

FileInfo.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    preview: PropTypes.string
  }).isRequired,
  showFileSize: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired
};

FileInfo.defaultProps = {
  file: {
    preview: undefined
  }
};
