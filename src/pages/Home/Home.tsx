import PhotoUpload from "./PhotoUpload/PhotoUpload";
import React, { useState } from "react";
import DataDisplay from "./DataDisplay/DataDisplay";
import { Data } from "../../types";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [sharedData, setSharedData] = useState<Data | undefined>(undefined);
  const updateSharedData = (newData: Data) => {
    return setSharedData(newData);
  };

  return (
    <>
      <PhotoUpload updateSharedData={updateSharedData} />
      <DataDisplay data={sharedData} />
    </>
  );
};

export default Home;
