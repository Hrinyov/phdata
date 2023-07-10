import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";

interface DataDisplayProps {
  data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  const dataDisplayRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = async () => {
    if (dataDisplayRef.current) {
      const image = await
      htmlToImage
        .toJpeg(dataDisplayRef.current)
       downloadScreenshot(image)
    }
  };

  const downloadScreenshot = (screenshot: string) => {
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "screenshot.jpg";
    link.click();
  };

  return (
  <>
  <div ref={dataDisplayRef} className="info">
      <div>ISO: {data.ISO}</div>
      <div>F{data.FNumber}</div>
      <div>ExposureTime: {data.ExposureTime}</div>
    </div>
    <div>
    <button onClick={captureScreenshot}>Capture Screenshot</button>  
    </div>
  </>
    
  );
};

export default DataDisplay;
