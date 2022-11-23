import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AboutBook from "./pages/AboutBook/AboutBook";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/:id" element={<AboutBook />} />
      </Routes>
    </div>
  );
}

export default App;
