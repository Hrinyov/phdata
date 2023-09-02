import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import {NavLink, Outlet} from 'react-router-dom';

function App() {

  return (
    <>
      <NavLink to='/'>Home</NavLink> <NavLink to='/profile'>Profile</NavLink>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
