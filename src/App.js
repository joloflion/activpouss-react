import "./App.scss";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import About from "./Pages/About/About";

import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Shop from "./Pages/Shop/Shop";
import { Admin } from "./Pages/Admin/Admin";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./Pages/Login/Login";


function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App container-fluid p-0 m-0">
      <div className="main">
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
            } />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </AuthProvider>
      </div>
      <ToastContainer position="top-right" />
      <ToastContainer />
    </div>
  );
}

export default App;
