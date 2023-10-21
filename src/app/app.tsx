import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Main from "../pages/main/main";
import Map from "../pages/map/map";
import Tasks from "../pages/tasks/tasks";
import Header from "../components/header";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/map" element={<Map />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
