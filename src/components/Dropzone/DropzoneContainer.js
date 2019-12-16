import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";

export const DropzoneContainer = forwardRef(
  ({ children, isDragActive, files, ...rest }, ref) => (
    <Box
      background={isDragActive || files.length ? "white" : "light-2"}
      border={{
        color: isDragActive ? "brand" : "light-5",
        style: "dashed",
        size: "medium"
      }}
      height={{
        min: "small"
      }}
      align={files.length ? "stretch" : "center"}
      justify="center"
      pad="xsmall"
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  )
);

DropzoneContainer.propTypes = {
  isDragActive: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
};
