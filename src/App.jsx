import { BrowserRouter, Routes, Route } from "react-router"
import ShopPage from "./Page/Front/ShopPage"
import LoginPage from "./Page/Front/LoginPage"
import RegisterPage from "./Page/Front/RegisterPage"
import OrderPage from "./Page/Front/OrderPage"
import CheckOutPage from "./Page/Front/CheckOutPage"
import ProductPage from "./Page/Front/ProductPage"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    window.history.pushState({}, "Home", "/")
  }, [])

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
