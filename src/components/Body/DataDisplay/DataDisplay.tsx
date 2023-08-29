import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import NumberConverter from "../../../utils/NumberConverter";
interface DataDisplayProps {
  data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  const dataDisplayRef = useRef<HTMLDivElement>(null);

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
      </div>
    </>
  );
};

export default DataDisplay;
