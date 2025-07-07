import { NavLink, Outlet } from "react-router";

function Navbar() {
  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-blue-500 font-bold" : "text-gray-700";

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex gap-4">
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
        <NavLink to="/about" className={navStyle}>
          About
        </NavLink>
        <NavLink to="/news" className={navStyle}>
          News
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
