import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
