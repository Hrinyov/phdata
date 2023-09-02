import PhotoUpload from "./PhotoUpload/PhotoUpload";
import React, { useState } from "react";
import DataDisplay from "./DataDisplay/DataDisplay";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [sharedData, setSharedData] = useState();
  const updateSharedData = (newData: any): void => {
    return setSharedData(newData);
  };

  return (
    <div>
      <PhotoUpload updateSharedData={updateSharedData} />
      <DataDisplay data={sharedData} />
    </div>
  );
};

export default Home;
