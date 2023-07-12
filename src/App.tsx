import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload';
import DataDisplay from './components/DataDisplay';

function App() {
 const [sharedData, setSharedData] = useState("");
 const updateSharedData = ( newData: any ): void => {
   return  setSharedData(newData);
 };

  return (
    <>
      <h1>Photodata in Image</h1>
      <FileUpload updateSharedData = {updateSharedData} />
      <DataDisplay data={sharedData} />
    </>
  );
}

export default App
