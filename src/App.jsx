import { BrowserRouter, Routes, Route } from "react-router"
import ShopPage from "./Front/ShopPage"
import LoginPage from "./Front/LoginPage"
import RegisterPage from "./Front/RegisterPage"
import OrderPage from "./Front/OrderPage"
import CheckOutPage from "./Front/CheckOutPage"
import ProductPage from "./Front/ProductPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopPage/>}/>
        <Route path="/account/login" element={<LoginPage/>}/>
        <Route path="/account/register" element={<RegisterPage/>}/>
        <Route path="/account/orders" element={<OrderPage/>}/>
        <Route path="/checkout" element={<CheckOutPage/>}/>
        <Route path="/product/:productId" element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
