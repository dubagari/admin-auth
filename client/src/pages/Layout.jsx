import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Signup from "./Signup";
import Login from "./login";
import Shop from "./Shop";
import AdminDashboard from "./AdminDashboard";
import Privateroute from "../Components/Privateroute";
import ProductForm from "../Components/ProductForm";

const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route element={<Privateroute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/create-product" element={<ProductForm />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Layout;
