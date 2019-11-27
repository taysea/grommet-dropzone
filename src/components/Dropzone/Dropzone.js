import React, { createRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { Anchor, Text } from "grommet";
import { DropzoneContainer } from "./DropzoneContainer";
import { File } from "./File";

export const Dropzone = ({
  accept,
  multiple,
  onAddFiles,
  onDeleteFiles,
  showPreview,
  showSize
}) => {
  const [myFiles, setMyFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const containerRef = createRef();

  useEffect(
    () => () => {
      // If we do this sometimes the path to file preview gets
      // lost for remaining files
      // Make sure to revoke the data uris to avoid memory leaks
      // myFiles.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [myFiles]
  );

  const onDrop = useCallback(
    acceptedFiles => {
      if (!disabled) {
        if (showPreview) {
          // Accepted files is read-only.
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          );
        }
        setMyFiles([...myFiles, ...acceptedFiles]);
        if (onAddFiles) {
          onAddFiles(acceptedFiles);
        }
        if (!multiple && myFiles.length === 0 && acceptedFiles.length > 0) {
          // When only single file allowed
          setDisabled(true);
        }
      }
    },
    [disabled, showPreview, myFiles, onAddFiles, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept, // Accept specific file types
    multiple, // Accept multiple files
    noClick: myFiles.length, // If files are in dropzone, disable click
    onDrop // onDrop handler
  });

  // Handler for 'X' button click
  const removeFile = file => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (onDeleteFiles) {
      onDeleteFiles(newFiles);
    }
    if (newFiles.length === 0) {
      setDisabled(false);
    }
  };

  return (
    <DropzoneContainer
      isDragActive={isDragActive}
      files={myFiles}
      ref={containerRef}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {myFiles.length
        ? myFiles.map((file, index) => (
            <File
              file={file}
              key={index}
              removeFile={removeFile}
              showPreview={showPreview}
              showSize={showSize}
            />
          ))
        : undefined}
      {!myFiles.length &&
        (isDragActive ? (
          <Text color="brand" weight="bold">
            Drop {multiple ? "files" : "file"} here
          </Text>
        ) : (
          <Text>
            Drag and drop or <Anchor>choose</Anchor>{" "}
            {multiple ? "files" : "a file"}
          </Text>
        ))}
    </DropzoneContainer>
  );
};

Dropzone.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onAddFiles: PropTypes.func,
  onDeleteFiles: PropTypes.func,
  showPreview: PropTypes.bool,
  showSize: PropTypes.bool
};

Dropzone.defaultProps = {
  accept: "",
  multiple: false,
  onAddFiles: undefined,
  onDeleteFiles: undefined,
  showPreview: false,
  showSize: false
};
