import "./App.css";
import Header from "./components/Header/Header";
import {NavLink, Outlet} from 'react-router-dom';

function App() {

  return (
    <>
      <NavLink to='/'>Home</NavLink> <NavLink to='/profile'>Profile</NavLink>
      <Header />
      <Outlet></Outlet>
      
    </>
  );
}

export default App;
