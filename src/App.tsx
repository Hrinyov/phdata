import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
