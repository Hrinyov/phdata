import { FC, useState } from "react";
import * as htmlToImage from "html-to-image";
import Classes from "./DataOrdering.module.css";
import { useRecoilValue } from "recoil";
import { photoDataState } from "../../../../state/atoms/AppState";
import { tokenState } from "../../../../state/atoms/AppState";
import { addPost } from "../../../../lib/axios/axiosGallery";
import base64ToBlob from "../../../../utils/base64ToBlob";

interface DataOrderingProps {
  dataDisplayRef: React.RefObject<HTMLDivElement>;
}

const DataOrdering: FC<DataOrderingProps> = ({ dataDisplayRef }) => {
  const token = useRecoilValue(tokenState);
  const data = useRecoilValue(photoDataState);
  const initialButtonName = "Add to gallery";
  const [buttonText, setButtonText] = useState(initialButtonName);

  const downloadScreenshot = (screenshot: string) => {
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "info.jpg";
    link.click();
  };

  const captureScreenshot = async () => {
    if (dataDisplayRef.current) {
      const image = await htmlToImage.toJpeg(dataDisplayRef.current);
      downloadScreenshot(image);
    }
  };

  const addPhotoToGalleryHandler = async () => {
    if (dataDisplayRef.current && token) {
      const image = await htmlToImage.toJpeg(dataDisplayRef.current);
      const parts = image.split(",");
      const base64Data = parts[1];
      const file = base64ToBlob(base64Data);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("description", "");
      
      try {
        const resStatus = await addPost(formData, token);
        if (resStatus === 201) {
          handleButtonStatus("Added");
        } else {
          handleButtonStatus("Failed...Try again.");
        }
      } catch (error) {
        console.error("Failed to add photo", error);
        handleButtonStatus("Failed...Try again.");
      }     
    }
  };

  const handleButtonStatus = (text: string) => {
    setButtonText(text);
    const timer = setTimeout(() => {
      setButtonText(initialButtonName);
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <div className={Classes["button-container"]}>
      <button onClick={captureScreenshot} disabled={!data}>
        Download image
      </button>
      <button onClick={addPhotoToGalleryHandler} disabled={!data || !token}>
        {buttonText}
      </button>
      {!token && <div> *to add photo to the gallery, you need to log in.</div>}
    </div>
  );
};

export default DataOrdering;
