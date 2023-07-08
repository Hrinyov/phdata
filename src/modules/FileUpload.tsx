import React, { useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import exifr from "exifr";

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<any | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the uploaded files here
    setFile(acceptedFiles[0]);
    extractMetadata(acceptedFiles[0]);
    console.log(metadata);
  }, []);

const extractMetadata = async (file: File) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    const dataURL = event.target?.result as string | undefined;
    if (dataURL) {
      try {
        const metadata = await exifr.parse(dataURL);
        setMetadata(metadata);
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
      
        <div>
          <h2>Metadata:</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      
    </div>
  );
};

export default FileUpload;
