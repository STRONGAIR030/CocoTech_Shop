import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React ,{ useEffect, useRef, useState } from "react";

import ShopPage from "./Page/Front/ShopPage";
import LoginPage from "./Page/Front/LoginPage";
import RegisterPage from "./Page/Front/RegisterPage";
import OrderPage from "./Page/Front/OrderPage";
import CheckOutPage from "./Page/Front/CheckOutPage";
import ProductPage from "./Page/Front/ProductPage";

import "./fade.css";
import AppContext from "./components/common/AppContext";
import axios from "axios";
import API_HOST from "./ApiHost";

function App() {

    const [productList, setProductList] = useState([]);
    const [productsDataLoaded, setLoading] = useState(false);
    const [userInf, setUser] = useState({isSignIn: false});
    const [shoppingCart, setCart] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetchProductsData();
        }, 3000)
    }, [])

    const fetchProductsData = async () => {
        const responce = await axios.get(`${API_HOST}/products`);
        const data = responce.data;
        console.log(data);
        
        setProductList(data);
        setLoading(true);        
    }

    const addProductToCart = (productId, name, imgUrl, price, quantity) => {
        const caulaterTotal = (price, quantity) => {
            return Number(price) * quantity;
        }

        setCart((prevCart) => {
            if(prevCart.some(product => product.id == productId)){
                return prevCart.map((product) => {
                    if(product.id != productId) return product
                                        
                    const totalQuantity = product.quantity + quantity
                    const updateProdcut = {
                        ...product, 
                        quantity: totalQuantity,
                        totalPrice: caulaterTotal(price, totalQuantity),
                    };
                    return updateProdcut
                })
            }
            else{        
                const updateProduct = {
                    id: productId,
                    name,
                    quantity,
                    imgUrl,
                    totalPrice: caulaterTotal(price, quantity),
                }               
                return [
                    ...prevCart,
                    updateProduct
                ]
            }  
        })
    }

    return (
        <AppContext.Provider
            value={{
                productList,
                userInf,
                shoppingCart,
                productsDataLoaded,
                addProductToCart,
            }}>
            <Router>
                <Routes location={location}>
                    <Route path="/" element={<ShopPage />} />
                    <Route path="/account/login" element={<LoginPage />} />
                    <Route path="/account/register" element={<RegisterPage />} />
                    <Route path="/account/orders" element={<OrderPage />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
