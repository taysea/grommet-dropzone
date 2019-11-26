import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box } from "grommet";

// To avoid nested button errors, this Box is created to allow focus/click behaviors of a button
// without actually being a button. This container can't be a button because when files are
// added to the Dropzone, each file contains a 'remove file' button.
const FocusBox = styled(Box)`
  cursor: pointer;
  &:focus {
    outline: 3px solid #6fffb0;
  }
`;

export const DropzoneContainer = forwardRef(
  ({ children, isDragActive, files, ...rest }, ref) => (
    <FocusBox
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
      ref={ref}
      {...rest}
    >
      {children}
    </FocusBox>
  )
);

DropzoneContainer.propTypes = {
  isDragActive: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
};
