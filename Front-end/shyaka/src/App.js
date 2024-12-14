import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './Home';
import Dashboard from './Dashboard.js';
import Navbar from "./Navbar.js";
import AboutUs from "./AboutUs.js";


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
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  </div>
</BrowserRouter>
  );
}

export default App;
