import { useState } from 'react'
import './App.css'
import FileUpload from './modules/FileUpload';
import DataDisplay from './modules/DataDisplay';

function App() {
 const [sharedData, setSharedData] = useState("");
 const updateSharedData = ( newData: any ): void => {
   return  setSharedData(newData);
 };

  return (
    <>
      <h1>File Upload Example</h1>
      <FileUpload updateSharedData = {updateSharedData} />
      <DataDisplay data={sharedData} />
    </>
  );
}

export default App
