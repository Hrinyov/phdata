import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink> <NavLink to="/profile">Profile</NavLink>
    </>
  );
};

export default Navbar;
