import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUpload;
