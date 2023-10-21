import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-blue-500 p-4 text-white">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li className="breadcrumb-item" key={name}>
              <Link to={routeTo}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
