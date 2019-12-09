import React, { createRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { DropzoneContainer } from "./DropzoneContainer";
import { DefaultMessage, DropMessage } from "./DropzoneMessages";
import { File } from "./File";

export const Dropzone = ({
  accept,
  multiple,
  onAddFiles,
  onDeleteFiles,
  showPreview,
  showFileSize
}) => {
  const [myFiles, setMyFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const containerRef = createRef();

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

  const currentFiles = myFiles.map((file, index) => (
    <File
      file={file}
      index={index}
      key={index}
      removeFile={removeFile}
      showPreview={showPreview}
      showFileSize={showFileSize}
      margin={{
        bottom: index !== myFiles.length - 1 ? "xsmall" : "none"
      }}
    />
  ));

  return (
    <DropzoneContainer
      isDragActive={isDragActive}
      files={myFiles}
      ref={containerRef}
      {...getRootProps()}
    >
      {/* This input is required by react-dropzone and expands to fill its bouding
       *  container. The UI is created by the elements below the input.
       */}
      <input {...getInputProps()} />
      {myFiles.length ? currentFiles : undefined}
      {!myFiles.length &&
        (!isDragActive ? (
          <DefaultMessage multiple={multiple} />
        ) : (
          <DropMessage multiple={multiple} />
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
  showFileSize: PropTypes.bool
};

Dropzone.defaultProps = {
  accept: "",
  multiple: false,
  onAddFiles: undefined,
  onDeleteFiles: undefined,
  showPreview: false,
  showFileSize: false
};
