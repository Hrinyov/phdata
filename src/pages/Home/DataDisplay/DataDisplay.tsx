import React, { useRef, useState } from "react";
import NumberConverter from "../../../utils/NumberConverter";
import DataOrdering from "./DataOrdering/DataOrdering";
import Filter from "./FilterForDataDisplay/Filter";
import Classes from "./DataDisplay.module.css";
import { Data } from "../../../types";

import leaver from "../../../assets/images/backgrounds/leaver.jpg";
import mountain from "../../../assets/images/backgrounds/mountain.jpg";
import nikon from "../../../assets/images/backgrounds/nikon.jpg";
import woods from "../../../assets/images/backgrounds/woods.jpg";

interface DataDisplayProps {
  data: Data | undefined;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {

  const dataDisplayRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("style1");


  const backgroundImages: {[key: string]: string} = {
    style1: leaver,
    style2: nikon,
    style3: mountain,
    style4: woods,
  };

  const selectedBackground = backgroundImages[selectedFilter];

  const style = {
    backgroundImage: `url(${selectedBackground})`,
  };

  const filterChangeHandler = (filter: string) => {
    setSelectedFilter(filter);
  };

  const fixNumber = (number: string | undefined) => {
    if(number?.toString().length === 1){
      return (number+'.0');
    }
    return number;
  }

  return (
    <>
      {data ? (
        <div
          ref={dataDisplayRef}
          className={`${Classes.info} ${Classes[selectedFilter]}`}
          style={style}
        >
          <div>ISO: {data.ISO}</div>
          <div>F: {fixNumber(data.FNumber)}</div>
          <div>
            ExposureTime:
            {NumberConverter(data.ExposureTime)}
          </div>
          {data.WhiteBalance && <div>WhiteBalance: {data.WhiteBalance}</div>}
          <div>Focal length: {data.FocalLength} mm</div>
          <div>Model: {data.Model}</div>
        </div>
      ) : (
        <div className={`${Classes.info} ${selectedFilter}`}>
          <h3>No photo data yet</h3>
        </div>
      )}
      <Filter onFilterChange={filterChangeHandler} />

      <DataOrdering data={data} dataDisplayRef={dataDisplayRef} />
    </>
  );
};

export default DataDisplay;