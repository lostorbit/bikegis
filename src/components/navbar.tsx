import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <aside className="bg-white w-64 p-4 shadow-lg">
      <h2 className="text-xl mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link to="/">Main Page</Link>
        </li>
        <li className="mb-2">
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className="mb-2">
          <Link to="/map*:">Maps</Link>
        </li>
        <li>
          <Link to="/efforts">Efforts</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Navbar;
