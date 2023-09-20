import React, { useCallback} from "react";
import { useDropzone } from "react-dropzone";
import exifr from "exifr";
import { Data } from "../../../types";

interface PhotoUploadProps {
  updateSharedData: (arg: Data) => void
}

const PhotoUpload: React.FC<PhotoUploadProps> = (  { updateSharedData }  ) => {

  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    extractMetadata(acceptedFiles[0]);
  }, []);

  const extractMetadata = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataURL = event.target?.result as string | undefined;
      if (dataURL) {
        try {
          const metadata = await exifr.parse(dataURL);
          const data: Data = {
            ISO: metadata.ISO,
            FNumber: metadata.FNumber,
            ExposureTime: metadata.ExposureTime,
            WhiteBalance: metadata.WhiteBalance,
            FocalLength: metadata.FocalLength,
            Model: metadata.Model,
          };
          updateSharedData(data);
        } catch (error) {
          console.log("Error extracting metadata:", error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  
  return (
    <div className="uploader" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>
          <strong> Drop </strong>
           the files here...
        </p>
      ) : (
        <p>
          <strong> Drag </strong>
          and
          <strong> drop </strong>
          files here, or
          <strong> click </strong>
          to select files
        </p>
      )}
    </div>
  );
};

export default PhotoUpload;
