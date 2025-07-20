import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
// import Cart from "./pages/Cart";
import Navbar from "./componets/Header/Navbar";
import ProductDetails from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Footer from "./componets/Footer/Footer";
import ScrollToTop from "./componets/ScrollToTop";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
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
  const knownRoutes = ["/", "/about", "/shop", "/contact",];
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
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Show footer only if it's not in hide list AND is a known route */}
      {!hideFooterRoutes.includes(location.pathname) && isKnownRoute && <Footer />}
    </>
  );
}

export default App;
