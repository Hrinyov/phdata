import { FC, useState } from "react";
import Classes from './Filter.module.css';

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("style1");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <>
      <h4>Select a preset:</h4>
      <div className={Classes["grid-container"]}>
        <label className={Classes.label}>
          <input
            type="radio"
            name="style"
            value="style1"
            checked={selectedFilter === "style1"}
            onChange={() => handleFilterChange("style1")}
          />
          Default
        </label>
        <label className={Classes.label}>
          <input
            type="radio"
            name="style"
            value="style2"
            checked={selectedFilter === "style2"}
            onChange={() => handleFilterChange("style2")}
          />
          Nikon
        </label>
        <label className={Classes.label}>
          <input
            type="radio"
            name="style"
            value="style3"
            checked={selectedFilter === "style3"}
            onChange={() => handleFilterChange("style3")}
          />
          Mountains
        </label>
        <label className={Classes.label}>
          <input
            type="radio"
            name="style"
            value="style4"
            checked={selectedFilter === "style4"}
            onChange={() => handleFilterChange("style4")}
          />
          Forest
        </label>
      </div>
    </>
  );
};

export default Filter;
