import Home from "./pages/Home";
import "./App.css";
import LayOut from "./components/Layout";
import ProductShow from "./pages/ProductShow";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <LayOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:type/:id" element={<ProductShow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Order />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayOut>
    </>
  );
}

export default App;
