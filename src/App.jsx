import Home from './pages/Home';
import './App.css';
import LayOut from './components/LayOut';
import ProductShow from './pages/ProductShow';
import Profile from './pages/Profile';
import Order from './pages/Order';
import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Category from './pages/Category';

function App() {
  return (
    <>
      <Routes>
        {/* These routes have the layout */}
        <Route
          path="/"
          element={
            <LayOut viewer="Customer">
              <Home />
            </LayOut>
          }
        />
        <Route
          path="/login"
          element={
            <LayOut viewer="Customer">
              <Login />
            </LayOut>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <LayOut viewer="Customer">
              <Category />
            </LayOut>
          }
        />
        <Route
          path="/product/:type/:id"
          element={
            <LayOut viewer="Customer">
              <ProductShow />
            </LayOut>
          }
        />
        <Route
          path="/profile"
          element={
            <LayOut viewer="Customer">
              <Profile />
            </LayOut>
          }
        />
        <Route
          path="/orders"
          element={
            <LayOut viewer="Customer">
              <Order />
            </LayOut>
          }
        />
        <Route
          path="/inventory"
          element={
            <LayOut viewer="Admin">
              <Inventory />
            </LayOut>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
