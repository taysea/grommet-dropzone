import React from "react";
import { Anchor, Text } from "grommet";

export const DefaultMessage = ({ multiple }) => {
  return (
    <Text>
      Drag and drop or <Anchor>choose</Anchor> {multiple ? "files" : "a file"}
    </Text>
  );
};

export const DropMessage = ({ multiple }) => {
  return (
    <Text color="brand" weight="bold">
      Drop {multiple ? "files" : "file"} here
    </Text>
  );
};
