import React from "react";

interface DataDisplayProps {
  data: any;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div>ISO: {data.ISO} </div>
      <div>F{data.FNumber}</div>
      <div>ExposureTime {data.ExposureTime}</div>
    </div>
  );
};

export default DataDisplay;
