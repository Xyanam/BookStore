import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AboutBook from "./pages/AboutBook/AboutBook";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Sidebar from "./components/Sidebar/Sidebar";
import AddBook from "./pages/Admin/AddBook/AddBook";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      {location.pathname.includes("admin") && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<AboutBook />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addBook" element={<AddBook />} />
      </Routes>
    </div>
  );
}

export default App;
