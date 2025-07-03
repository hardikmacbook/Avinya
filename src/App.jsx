import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Error from "../src/pages/Error";
import Cart from "../src/pages/Cart";
import Navbar from "../src/componets/Navbar";
import ProductDetails from "../src/pages/ProductDetail";
import Shop from "../src/pages/Shop";
import Footer from "../src/componets/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </CartProvider>
  );
}

function MainLayout() {
  const location = useLocation();

  // Define the routes where Footer should NOT be shown
  const hideFooterRoutes = ["/"];

  // Check if current path matches any known route
  const knownRoutes = ["/", "/about", "/shop", "/contact", "/cart"];
  const isKnownRoute = knownRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith("/shop/")
  );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:title" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Show footer only if it's not in hide list AND is a known route */}
      {!hideFooterRoutes.includes(location.pathname) && isKnownRoute && <Footer />}
    </>
  );
}

export default App;
