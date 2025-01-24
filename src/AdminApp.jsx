import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminContext from "./components/context/AdminContext";
import AdminCustomersPage from "./Page/admin/AdminCustomersPage";
import AdminHomePage from "./Page/admin/AdminHomePage";
import AdminLoginPage from "./Page/admin/AdminLoginPage";
import AdminOrdersPage from "./Page/admin/AdminOrdersPage";
import AdminProductsPage from "./Page/admin/AdminProductsPage";
import AdminOrder from "./Page/admin/AdminOrder";
import AdminCustomer from "./Page/admin/AdminCustomer";
import AdminProduct from "./Page/admin/AdminProduct";
import { API_HOST, SESSION_KEYS } from "./constants";
import {
    fetchAllOrderData,
    fetchCustomerData,
    processOrdersData,
} from "./apiHelpers";

const isSignIn = () => {
    return sessionStorage.getItem(SESSION_KEYS.IS_SIGN_IN) == "true";
};

const adminRoutes = [
    { path: "/home", element: <AdminHomePage /> },
    { path: "/orders", element: <AdminOrdersPage /> },
    { path: "/orders/:orderId", element: <AdminOrder /> },
    { path: "/customers", element: <AdminCustomersPage /> },
    { path: "/customers/:customerId", element: <AdminCustomer /> },
    { path: "/products", element: <AdminProductsPage /> },
    { path: "/products/:productId", element: <AdminProduct /> },
];

const PrivateRoute = () => {
    return isSignIn() ? (
        <Routes>
            {adminRoutes.map(({ path, element }) => {
                return <Route key={path} path={path} element={element} />;
            })}
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
    const [orderDataLoaded, setOrderDataLoaded] = useState(false);
    const [customerDataLoaded, setCustomerDataLoaded] = useState(false);

    useEffect(() => {
        if (isSignIn()) {
            const adminName = sessionStorage.getItem(SESSION_KEYS.ADMIN_NAME);
            adminSignIn(adminName);
        }
    }, []);

    const adminSignIn = (adminName) => {
        setAdminInf({
            isSignIn: true,
            name: adminName,
        });

        if (!isSignIn()) {
            sessionStorage.setItem(SESSION_KEYS.IS_SIGN_IN, "true");
            sessionStorage.setItem(SESSION_KEYS.ADMIN_NAME, adminName);
        }
    };

    const adminSignOut = () => {
        setAdminInf({ isSignIn: false });

        sessionStorage.setItem(SESSION_KEYS.IS_SIGN_IN, "false");
        sessionStorage.setItem(SESSION_KEYS.ADMIN_NAME, "");
    };

    const fetchOrderList = async () => {
        const orders = await fetchAllOrderData();

        const updatedOrders = await processOrdersData(orders);

        const reversedList = updatedOrders.reverse();
        console.log(reversedList);

        setOrderList(reversedList);
        setOrderDataLoaded(true);
    };

    const fetchCustomerList = async () => {
        try {
            const { data: customerListData } = await axios(
                `${API_HOST}/customers?id_ne=0`,
            );
            const updateList = customerListData.map((customer) => {
                return {
                    id: customer.id,
                    email: customer.email,
                    name: customer.name,
                };
            });

            setCustomersList(updateList);
            setCustomerDataLoaded(true);
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
