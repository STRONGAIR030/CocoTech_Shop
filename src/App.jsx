import { BrowserRouter as Router, Routes, Route} from "react-router";
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
    const [searchText, setSearchText] = useState(""); 
    const [shoppingCart, setCart] = useState([]);
    const isloging = useRef(false)

    useEffect(() => {
        if(!isloging.current && userInf.isSignIn){
            const putData = shoppingCart.map((product) => {
                return {
                    productId: product.id,
                    quantity: product.quantity,
                }
            })
            axios.put(`${API_HOST}/shoppingCart/${userInf.id}`, {cartContent: putData})
            .then((res) => {
                  
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }, [shoppingCart, userInf])

    const fetchProductsData = async () => {
        const responce = await axios.get(`${API_HOST}/products`);
        const data = responce.data;
        console.log(data);
        
        setProductList(data);
        setLoading(true);        
    }

    const clearShoppingCart = () => {
        setCart([])
    }

    const modifyProductToCart = (productId, quantity, name, imgUrl, price) => {
        const caulaterTotal = (price, quantity) => {
            return Number(price) * quantity;
        }

        setCart((prevCart) => {
            if(prevCart.some(product => product.id == productId)){
                if(quantity === "delete" || prevCart.some(product => product.id == productId && product.quantity + quantity <= 0)){
                   return prevCart.filter(product => product.id != productId) 
                }

                return prevCart.map((product) => {
                    if(product.id != productId) return product

                    const totalQuantity = product.quantity + quantity
                    const updateProdcut = {
                        ...product, 
                        quantity: totalQuantity,
                        totalPrice: caulaterTotal(product.price, totalQuantity),
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
                    price,
                    totalPrice: caulaterTotal(price, quantity),
                }               
                return [
                    ...prevCart,
                    updateProduct
                ]
            }  
        })
    }

    const userSignIn = async (userId, userEmail, userName) => {
        isloging.current = true;
        setUser({
            isSignIn: true,
            id: userId,
            email: userEmail,
            name: userName
        })
        console.log(userId);
        
        try{
            const getResponce = await axios.get(`${API_HOST}/shoppingCart?id=${userId}`)
            const data = getResponce.data
            console.log(data);
            if(data.length == 0){
                const cartContent = shoppingCart.map((product) => {
                    return {
                        productId: product.id,
                        quantity: product.quantity,
                    }
                })
                const postData = {
                    id: userId,
                    cartContent,
                }
                const postResponce = await axios.post(`${API_HOST}/shoppingCart`, postData)
                console.log(`post : ${postResponce.data}`);
                
            }
            else{
                const cartData = await Promise.all(data[0].cartContent.map(async (product) => {
                    const {data: productData} = await axios.get(`${API_HOST}/products/${product.productId}`)
                    console.log(productData);
                    
                    
                    return {
                        id: productData.id,
                        name: productData.name,
                        quantity: product.quantity,
                        price: productData.price,
                        imgUrl: productData.img[0],
                        totalPrice: product.quantity * Number(productData.price),
                    }
                }))

                setCart(cartData)

            }
            
            isloging.current = false;


        } catch (error) {
            console.error(error);
        }        
    }

    return (
        <AppContext.Provider
            value={{
                productList,
                userInf,
                shoppingCart,
                productsDataLoaded,
                searchText,
                setSearchText,
                modifyProductToCart,
                fetchProductsData,
                clearShoppingCart,
                userSignIn,
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
