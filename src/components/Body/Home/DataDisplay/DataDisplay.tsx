import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import NumberConverter from "../../../../utils/NumberConverter";
import useToken from "../../../../hooks/use-token";
import axios from "axios";

interface DataDisplayProps {
  data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  const dataDisplayRef = useRef<HTMLDivElement>(null);
  const {token} = useToken();
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

  const addPhotoToGalleryHandler = async () =>{

      if (dataDisplayRef.current && token) {
        const image = await htmlToImage.toJpeg(dataDisplayRef.current);
        const parts = image.split(",");
        const base64Data = parts[1];
        const file = base64ToBlob(base64Data);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', '');
        axios.post("http://localhost:8080/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }).then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      }

  }

  return (
    <>
      {data ? (
        <div ref={dataDisplayRef} className="info">
          <div className="item">ISO: {data.ISO}</div>
          <div className="item">F: {data.FNumber}</div>
          <div className="item">
            ExposureTime:
            {NumberConverter(data.ExposureTime)}
          </div>
          <div className="item">WhiteBalance: {data.WhiteBalance}</div>
        </div>
      ) : (
        <div className="info">No photo added yet</div>
      )}

      <div>
        <button onClick={captureScreenshot} disabled={!data}>
          Download image
        </button>
        <button
          onClick={addPhotoToGalleryHandler}
          disabled={!data || !token}
        >
          Add to gallery
        </button>
      </div>
    </>
  );
};

export default DataDisplay;
