import React, { useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import exifr from "exifr";

interface FileUploadProps {
  updateSharedData: (arg: DataTransfer) => void
}

const FileUpload: React.FC<FileUploadProps> = (  { updateSharedData }  ) => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the uploaded files here
    setFile(acceptedFiles[0]);
    extractMetadata(acceptedFiles[0]);

  }, []);

  const extractMetadata = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataURL = event.target?.result as string | undefined;
      if (dataURL) {
        try {
          const metadata = await exifr.parse(dataURL);
          setMetadata(metadata);
          updateSharedData(metadata);
        } catch (error) {
          console.log("Error extracting metadata:", error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

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
