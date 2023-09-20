import { NavLink } from "react-router-dom";

const Navbar: React.FC = () =>{
    return (
      <>
        <NavLink to="/">Home</NavLink> <NavLink to="/profile">Profile</NavLink>
      </>
    );
}

export default Navbar;