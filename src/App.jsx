import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Error from "./pages/Error"
import Cart from "./pages/Cart"
import Navbar from "./componets/Navbar"
import ProductDetails from "./pages/ProductDetail"
import Shop from "./pages/Shop"
import { CartProvider } from "./context/CartContext"

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/shop/:title" element={<ProductDetails/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App