import React, {useState} from 'react';
import axios from 'axios';
import * as htmlToImage from "html-to-image";
import useToken from '../../../../../hooks/use-token';
import Classes from './DataOrdering.module.css';

interface DataOrderingProps {
    dataDisplayRef: React.RefObject<HTMLDivElement>,
    data: any,
}

const DataOrdering: React.FC<DataOrderingProps> = ({dataDisplayRef, data}) =>{

    const { token } = useToken();
    const initialButtonName = "Add to gallery"
    const [buttonText, setButtonText] = useState(initialButtonName);

    const captureScreenshot = async () => {
      if (dataDisplayRef.current) {
        const image = await htmlToImage.toJpeg(dataDisplayRef.current);
        downloadScreenshot(image);
      }
    };

    const downloadScreenshot = (screenshot: string) => {
      const link = document.createElement("a");
      link.href = screenshot;
      link.download = "info.jpg";
      link.click();
    };

    const base64ToBlob = (base64String: string, contentType = "image/jpeg") => {
      const byteCharacters = atob(base64String);
      const arrayBuffer = new ArrayBuffer(byteCharacters.length);
      const view = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteCharacters.length; i++) {
        view[i] = byteCharacters.charCodeAt(i);
      }

      return new Blob([arrayBuffer], { type: contentType });
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
        axios
          .post("http://localhost:8080/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-auth-token": token,
            },
          })
          .then((response) => {
            if(response.status === 201){
              setButtonText("Added");
              const timer = setTimeout(()=>{
                setButtonText(initialButtonName);
                clearTimeout(timer);
              },2000);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    return (
      <div className={Classes["button-container"]}>
        <button onClick={captureScreenshot} disabled={!data}>
          Download image
        </button>
        <button onClick={addPhotoToGalleryHandler} disabled={!data || !token}>
          {buttonText}
        </button>
        {!token &&
        <div> *to add photo to the gallery, you need to log in.</div>
        }
      </div>
    );
}

export default DataOrdering;