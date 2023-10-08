import { FC, useRef, useState } from "react";
import NumberConverter from "../../../utils/NumberConverter";
import DataOrdering from "./DataOrdering/DataOrdering";
import Filter from "./FilterForDataDisplay/Filter";
import Classes from "./DataDisplay.module.css";
import { useRecoilValue } from "recoil";
import { photoDataState } from "../../../state/atoms/AppState";
import { BACKGROUND_IMAGES } from "../../../config/constants";

const DataDisplay: FC = () => {
  const data = useRecoilValue(photoDataState);
  const dataDisplayRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("style1");

  const style = {
    backgroundImage: `url(${BACKGROUND_IMAGES[selectedFilter]})`,
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
          {data.ISO && <div>ISO: {data.ISO}</div>}
          {data.FNumber && <div>F: {fixNumber(data.FNumber)}</div>}
          {data.ExposureTime && <div>
            ExposureTime:
            {NumberConverter(data.ExposureTime)}
          </div>}
          {data.WhiteBalance && <div>WhiteBalance: {data.WhiteBalance}</div>}
          {data.FocalLength && <div>Focal length: {data.FocalLength} mm</div>}
          {data.Model && <div>Model: {data.Model}</div>}
          {!data.ISO && <div>Invalid data</div>}
        </div>
      ) : (
        <div className={`${Classes.info} ${selectedFilter}`}>
          <h3>No photo data yet</h3>
        </div>
      )}
      <Filter onFilterChange={filterChangeHandler} />
      <DataOrdering dataDisplayRef={dataDisplayRef} />
    </>
  );
};

export default DataDisplay;
