import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AboutBook from "./pages/AboutBook/AboutBook";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import { ToastContainer, toast } from "react-toastify";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<AboutBook />} />
      </Routes>
    </div>
  );
}

export default App;
