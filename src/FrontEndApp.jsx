import { Routes, Route } from "react-router";
import { useEffect, useRef, useState } from "react";

import ShopPage from "./Page/Front/ShopPage";
import LoginPage from "./Page/Front/LoginPage";
import RegisterPage from "./Page/Front/RegisterPage";
import OrderPage from "./Page/Front/OrderPage";
import CheckOutPage from "./Page/Front/CheckOutPage";
import ProductPage from "./Page/Front/ProductPage";

import axios from "axios";
import { ACTION_DELETE, API_HOST } from "./constants";
import FrontContext from "./components/context/FrontContext";
import { Navigate } from "react-router";
import { fetchAllProductData } from "./apiHelpers";
import TestPage from "./Page/TestPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const frontEndRoutes = [
    { path: "/", element: <ShopPage /> },
    { path: "/account/login", element: <LoginPage /> },
    { path: "/account/register", element: <RegisterPage /> },
    { path: "/account/orders", element: <OrderPage /> },
    { path: "/checkout", element: <CheckOutPage /> },
    { path: "/product/:productId", element: <ProductPage /> },
    { path: "/test", element: <TestPage /> },
];

function FrontEndApp() {
    const [productList, setProductList] = useState([]);
    const [productsDataLoaded, setProductsDataLoaded] = useState(false);
    const [userInf, setUser] = useState({ isSignIn: false });
    const [searchText, setSearchText] = useState("");
    const [shoppingCart, setCart] = useState([]);
    const isloging = useRef(false);

    useEffect(() => {
        const updateShoppingCart = async () => {
            try {
                const formattedCurrentCart = shoppingCart.map((product) => {
                    return {
                        productId: product.id,
                        quantity: product.quantity,
                    };
                });
                await axios.put(`${API_HOST}/shoppingCart/${userInf.id}`, {
                    cartContent: formattedCurrentCart,
                });
            } catch (err) {
                console.error("Error occurred while update shoppingCart:", err);
            }
        };

        if (!isloging.current && userInf.isSignIn) {
            updateShoppingCart();
        }
    }, [shoppingCart, userInf]);

    const fetchProductsData = async () => {
        const productsData = await fetchAllProductData();
        const processedProductsData = productsData.map((product) => {
            return {
                ...product,
                price: Number(product.price),
            };
        });
        console.log(processedProductsData);

        setProductList(processedProductsData);
        setProductsDataLoaded(true);
    };

    const clearShoppingCart = () => {
        setCart([]);
    };

    const modifyProductToCart = (productId, quantity, name, imgUrl, price) => {
        const caulaterTotal = (price, quantity) => {
            return Number(price) * quantity;
        };

        setCart((prevCart) => {
            if (prevCart.some((product) => product.id == productId)) {
                if (
                    quantity === ACTION_DELETE ||
                    prevCart.some(
                        (product) =>
                            product.id == productId &&
                            product.quantity + quantity <= 0,
                    )
                ) {
                    return prevCart.filter(
                        (product) => product.id != productId,
                    );
                }

                return prevCart.map((product) => {
                    if (product.id != productId) return product;

                    const totalQuantity = product.quantity + quantity;
                    const updateProdcut = {
                        ...product,
                        quantity: totalQuantity,
                        totalPrice: caulaterTotal(product.price, totalQuantity),
                    };
                    return updateProdcut;
                });
            } else {
                const updateProduct = {
                    id: productId,
                    name,
                    quantity,
                    imgUrl,
                    price,
                    totalPrice: caulaterTotal(price, quantity),
                };
                return [...prevCart, updateProduct];
            }
        });
    };

    const createShoppinCart = async (userId) => {
        try {
            const formattedCurrentCart = shoppingCart.map((product) => {
                return {
                    productId: product.id,
                    quantity: product.quantity,
                };
            });
            const newCart = {
                id: userId,
                cartContent: formattedCurrentCart,
            };
            const postResponce = await axios.post(
                `${API_HOST}/shoppingCart`,
                newCart,
            );
            console.log(`post :`, postResponce.data);
        } catch (err) {
            console.error("Error occurred while creating shoppingCart:", err);
        }
    };

    const syncShoppingCart = async (userId) => {
        try {
            const { data: cartData } = await axios.get(
                `${API_HOST}/shoppingCart/${userId}`,
            );
            console.log(cartData);

            const formattedCartData = await Promise.all(
                cartData.cartContent.map(async (product) => {
                    const { data: productData } = await axios.get(
                        `${API_HOST}/products/${product.productId}`,
                    );
                    console.log(productData);

                    return {
                        id: productData.id,
                        name: productData.name,
                        quantity: product.quantity,
                        price: productData.price,
                        imgUrl: productData.img[0],
                        totalPrice:
                            product.quantity * Number(productData.price),
                    };
                }),
            );

            setCart(formattedCartData);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log("cart don't exit!");
                await createShoppinCart(userId);
            } else {
                console.error("Error occurred while sync shoppingCart:", error);
            }
        }
    };

    const userSignIn = async (userId, userEmail, userName) => {
        isloging.current = true;
        setUser({
            isSignIn: true,
            id: userId,
            email: userEmail,
            name: userName,
        });
        console.log(userId);

        try {
            await syncShoppingCart(userId);
            isloging.current = false;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Provider store={store}>
            <FrontContext.Provider
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
                }}
            >
                <Routes>
                    {frontEndRoutes.map(({ path, element }) => {
                        return (
                            <Route key={path} path={path} element={element} />
                        );
                    })}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </FrontContext.Provider>
        </Provider>
    );
}

export default FrontEndApp;
