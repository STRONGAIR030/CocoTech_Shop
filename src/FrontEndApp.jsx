import { Routes, Route } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';

import ShopPage from './Page/Front/ShopPage';
import LoginPage from './Page/Front/LoginPage';
import RegisterPage from './Page/Front/RegisterPage';
import OrderPage from './Page/Front/OrderPage';
import CheckOutPage from './Page/Front/CheckOutPage';
import ProductPage from './Page/Front/ProductPage';

import axios from 'axios';
import API_HOST from './ApiHost';
import FrontContext from './components/context/FrontContext';
import { Navigate } from 'react-router';

function FrontEndApp() {
	const [productList, setProductList] = useState([]);
	const [productsDataLoaded, setLoading] = useState(false);
	// setLoading 建議改為更具描述性的名稱，例如 setProductsDataLoaded，避免誤解為全局 loading 狀態
	const [userInf, setUser] = useState({ isSignIn: false });
	const [searchText, setSearchText] = useState('');
	const [shoppingCart, setCart] = useState([]);
	const isloging = useRef(false);

	useEffect(() => {
		if (!isloging.current && userInf.isSignIn) {
			const putData = shoppingCart.map((product) => {
				return {
					productId: product.id,
					quantity: product.quantity,
				};
			});
			axios
				.put(`${API_HOST}/shoppingCart/${userInf.id}`, {
					cartContent: putData,
				})
				.then((res) => {})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [shoppingCart, userInf]);

	const fetchProductsData = async () => {
		const responce = await axios.get(`${API_HOST}/products`);
		const data = responce.data;
		console.log(data);

		setProductList(data);
		setLoading(true);
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
					quantity === 'delete' ||
					prevCart.some(
						(product) =>
							product.id == productId &&
							product.quantity + quantity <= 0
					)
				) {
					return prevCart.filter(
						(product) => product.id != productId
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
	// You can try to make route flexible
	// const adminRoutes = [
	//     { path: "/home", element: <AdminHomePage /> },
	//     { path: "/orders", element: <AdminOrdersPage /> },
	//     { path: "/customers", element: <AdminCustomersPage /> },
	//     // 其他路由...
	//   ];

	//   const PrivateRoute = () => {
	//     return isSignIn() ? (
	//       <Routes>
	//         {adminRoutes.map(({ path, element }) => (
	//           <Route key={path} path={path} element={element} />
	//         ))}
	//         <Route path="*" element={<Navigate to="/admin/home" />} />
	//       </Routes>
	//     ) : (
	//       <Navigate to="/admin/login" />
	//     );
	//   };

	// userSignIn 拆分邏輯：
	// 1.	登入處理：專注於驗證用戶，並更新狀態。
	// 2.	購物車同步：分離為獨立的同步功能。
	// •	將購物車同步邏輯放入工具函式，或考慮在 useEffect 內觸發。
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
			const getResponce = await axios.get(
				`${API_HOST}/shoppingCart?id=${userId}`
			);
			const data = getResponce.data;
			console.log(data);
			if (data.length == 0) {
				const cartContent = shoppingCart.map((product) => {
					return {
						productId: product.id,
						quantity: product.quantity,
					};
				});
				const postData = {
					id: userId,
					cartContent,
				};
				const postResponce = await axios.post(
					`${API_HOST}/shoppingCart`,
					postData
				);
				console.log(`post : ${postResponce.data}`);
			} else {
				const cartData = await Promise.all(
					data[0].cartContent.map(async (product) => {
						const { data: productData } = await axios.get(
							`${API_HOST}/products/${product.productId}`
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
					})
				);

				setCart(cartData);
			}

			isloging.current = false;
		} catch (error) {
			console.error(error);
		}
	};

	return (
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
			<Routes location={location}>
				<Route path="/" element={<ShopPage />} />
				<Route path="/account/login" element={<LoginPage />} />
				<Route path="/account/register" element={<RegisterPage />} />
				<Route path="/account/orders" element={<OrderPage />} />
				<Route path="/checkout" element={<CheckOutPage />} />
				<Route path="/product/:productId" element={<ProductPage />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</FrontContext.Provider>
	);
}

export default FrontEndApp;
