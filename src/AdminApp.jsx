import { Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import AdminContext from './components/context/AdminContext';
import AdminCustomersPage from './Page/admin/AdminCustomersPage';
import AdminHomePage from './Page/admin/AdminHomePage';
import AdminLoginPage from './Page/admin/AdminLoginPage';
import AdminOrdersPage from './Page/admin/AdminOrdersPage';
import AdminProductsPage from './Page/admin/AdminProductsPage';
import AdminOrder from './Page/admin/AdminOrder';
import AdminCustomer from './Page/admin/AdminCustomer';
import AdminProduct from './Page/admin/AdminProduct';
import API_HOST from './ApiHost';

const isSignIn = () => {
	// Magic String: 'isSignIn'
	// 提取這些字串作為常數或 enum，便於管理
	return sessionStorage.getItem('isSignIn') == 'true';
};

const PrivateRoute = () => {
	return isSignIn() ? (
		<Routes>
			<Route path="/home" element={<AdminHomePage />} />
			<Route path="/orders" element={<AdminOrdersPage />} />
			<Route path="/orders/:orderId" element={<AdminOrder />} />
			<Route path="/customers" element={<AdminCustomersPage />} />
			<Route path="/customers/:customerId" element={<AdminCustomer />} />
			<Route path="/products" element={<AdminProductsPage />} />
			<Route path="/products/:productId" element={<AdminProduct />} />
			<Route path="*" element={<Navigate to="/admin/home" />} />
		</Routes>
	) : (
		<Navigate to="/admin/login" />
	);
};

const LoginRoute = () => {
	return isSignIn() ? <Navigate to="/admin/home" /> : <AdminLoginPage />;
};

const AdminApp = () => {
	const [adminInf, setAdminInf] = useState({ isSignIn: false });
	const [orderList, setOrderList] = useState([]);
	const [customerList, setCustomersList] = useState([]);
	const [orderDataLoaded, setOrderDateLoaded] = useState(false);
	// typo: setOrderDateLoaded 中的 Date 應該是 Data。
	const [customerDataLoaded, setCustomerDateLoaded] = useState(false);

	useEffect(() => {
		if (isSignIn()) {
			const adminName = sessionStorage.getItem('adminName');
			adminSignIn(adminName);
		}
	}, []);

	const adminSignIn = (adminName) => {
		setAdminInf({
			isSignIn: true,
			name: adminName,
		});

		if (!isSignIn()) {
			sessionStorage.setItem('isSignIn', 'true');
			sessionStorage.setItem('adminName', adminName);
		}
	};

	const adminSignOut = () => {
		setAdminInf({ isSignIn: false });

		sessionStorage.setItem('isSignIn', 'false');
		sessionStorage.setItem('adminName', '');
	};
	// fetchOrderList:
	// •	將 資料請求 與 資料處理 分開：
	// •	提取單一功能的資料請求為工具函式。
	// •	集中處理資料加工的邏輯，保持簡潔。
	// •	增加錯誤處理機制，防止單一 API 錯誤影響整體流程。

	const fetchOrderList = async () => {
		// you should use try catch here
		const { data: orderListData } = await axios(`${API_HOST}/orders`);

		const updateList = await Promise.all(
			orderListData.map(async (order) => {
				const { data: userData } = await axios(
					`${API_HOST}/customers/${order.customersId}`
				);

				const updateData = {
					id: order.id,
					customersId: order.customersId,
					total: order.subTotal + order.shipping,
					date: order.date,
					customerName: userData.name,
					status: 0,
				};

				return updateData;
			})
		);

		const reversedList = updateList.reverse();
		console.log(reversedList);

		setOrderList(reversedList);
		setOrderDateLoaded(true);
	};

	const fetchCustomerList = async () => {
		try {
			const { data: customerListData } = await axios(
				`${API_HOST}/customers?id_ne=0`
			);
			const updateList = customerListData.map((customer) => {
				return {
					id: customer.id,
					email: customer.email,
					name: customer.name,
				};
			});

			setCustomersList(updateList);
			setCustomerDateLoaded(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AdminContext.Provider
			value={{
				adminInf,
				orderList,
				fetchOrderList,
				orderDataLoaded,
				adminSignIn,
				adminSignOut,
				fetchCustomerList,
				customerDataLoaded,
				customerList,
			}}
		>
			<Routes>
				<Route path="/login" element={<LoginRoute />} />
				<Route path="/*" element={<PrivateRoute />} />
			</Routes>
		</AdminContext.Provider>
	);
};

export default AdminApp;
