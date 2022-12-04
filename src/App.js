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
import Users from "./pages/Admin/Users/Users";
import Comments from "./pages/Admin/Comments/Comments";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const { banned } = useSelector((state) => state.user);
  return (
    <div className="App">
      <Header />
      {banned === "1" ? (
        <div className="banned">
          <h1>Вы заблокированы администратором!</h1>
        </div>
      ) : (
        <>
          <ToastContainer position="top-center" autoClose={2000} />
          {location.pathname.includes("admin") && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<AboutBook />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addBook" element={<AddBook />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/comments" element={<Comments />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
