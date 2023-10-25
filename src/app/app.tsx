import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Main from "../pages/main/main";
import Map from "../pages/map/map";
import Efforts from "../pages/efforts/efforts";
import Header from "../components/header";
import Calendar from "../pages/calendar/calendar";

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
            <Route path="/efforts" element={<Efforts />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
