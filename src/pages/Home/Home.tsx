import { FC } from "react";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import DataDisplay from "./DataDisplay/DataDisplay";

const Home: FC = () => {
  
  return (
    <>
      <PhotoUpload />
      <DataDisplay />
    </>
  );
};

export default Home;
