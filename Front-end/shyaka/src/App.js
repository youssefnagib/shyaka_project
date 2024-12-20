import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './Home';
import Dashboard from './Dashboard.js';
import Navbar from "./Navbar.js"
import AboutUs from "./AboutUs.js";
import MenProducts from "./MenProduct.js";
import WomenProducts from "./WomenProduct.js";
import ProductInfo from "./ProductInfo.js";
import Cart from "./Cart.js";
import Checkout from "./Checkout.js";
import Products from "./Product.js";
import OrderInfo from "./OrderInfo.js";

function App() {
  return (
<BrowserRouter>
  <div>
    <Navbar/>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/order/:id" element={<OrderInfo />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/products" element={<Products />} />
      <Route path="/menproducts" element={<MenProducts />} />
      <Route path="/womenproducts" element={<WomenProducts />} />
      <Route path="/product/:id" element={<ProductInfo />} />

    </Routes>
  </div>
</BrowserRouter>
  );
}

export default App;
