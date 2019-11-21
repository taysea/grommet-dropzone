import styled from "styled-components";
import { Box } from "grommet";

// To avoid nested button errors, this Box is created to allow focus/click behaviors of a button
// without actually being a button. This container can't be a button because when files are
// added to the Dropzone, each file contains a 'remove file' button.
export const FocusBox = styled(Box)`
  cursor: pointer;
  &:focus {
    outline: 3px solid #6fffb0;
  }
`;
