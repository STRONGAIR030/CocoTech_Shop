import { Routes, Route, Navigate} from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminContext from "./components/context/AdminContext"
import AdminCustomersPage from "./Page/admin/AdminCustomersPage"
import AdminHomePage from "./Page/admin/AdminHomePage"
import AdminLoginPage from "./Page/admin/AdminLoginPage"
import AdminOrdersPage from "./Page/admin/AdminOrdersPage"
import AdminProductsPage from "./Page/admin/AdminProductsPage"
import AdminOrder from "./Page/admin/AdminOrder";
import AdminCustomer from "./Page/admin/AdminCustomer";
import AdminProduct from "./Page/admin/AdminProduct";
import API_HOST from "./ApiHost";

const isSignIn = () => {
    return sessionStorage.getItem("isSignIn") == "true";
  };
  

const PrivateRoute = () => {
    return isSignIn() ? 
    <Routes>
        <Route path="/home" element={<AdminHomePage />} />
        <Route path="/orders" element={<AdminOrdersPage />} />
        <Route path="/orders/:orderId" element={<AdminOrder />} />
        <Route path="/customers" element={<AdminCustomersPage />} />
        <Route path="/customers/:customerId" element={<AdminCustomer />} />
        <Route path="/products" element={<AdminProductsPage />} />
        <Route path="/products/:productId" element={<AdminProduct />} />
        <Route path="*" element={<Navigate to="/admin/home" />} />
    </Routes> : <Navigate to="/admin/login" />;
  };
  
  // 登錄路由：已登入時重定向到 /admin/home
const LoginRoute = () => {
    return isSignIn() ? <Navigate to="/admin/home"/> : <AdminLoginPage/>;
};


const AdminApp = () => {
    const [adminInf, setAdminInf] = useState({isSignIn: false});
    const [orderList, setOrderList] = useState([]);
    const [orderDataLoaded, setOrderDateLoaded] = useState(false);

    useEffect(() => {
        if(isSignIn()){
            const adminName = sessionStorage.getItem("adminName");
            adminSignIn(adminName);
        }
    }, [])

    const adminSignIn = (adminName) => {
        setAdminInf({
            isSignIn: true,
            name: adminName,
        })

        if(!isSignIn()){
            sessionStorage.setItem("isSignIn", "true");
            sessionStorage.setItem("adminName", adminName);
        }
        
    }

    const adminSignOut = () => {
        setAdminInf({isSignIn: false});

        sessionStorage.setItem("isSignIn", "false");
        sessionStorage.setItem("adminName", "");
    }

    const fetchOrderList = async () => {
        const {data: orderListData} = await axios(`${API_HOST}/orders`)

        const updateList = await Promise.all(orderListData.map(async (order) => {
            const {data: userData} = await axios(`${API_HOST}/customers/${order.customersId}`)

            const updateData = {
                id: order.id,
                customersId: order.customersId,
                total: order.subTotal + order.shipping,
                date: order.date,
                customerName: userData.name,
                status: 0
            }

            return updateData
        }))

        const reversedList = updateList.reverse();
        console.log(reversedList);
        

        setOrderList(reversedList);
        setOrderDateLoaded(true)
    }

    return (
        <AdminContext.Provider
            value={{
                adminInf,
                orderList,
                fetchOrderList,
                orderDataLoaded,
                adminSignIn,
                adminSignOut,
            }}
        >
        <Routes>
            <Route path="/login" element={<LoginRoute/>} />
            <Route path="/*" element={<PrivateRoute/>} />
        </Routes>
    </AdminContext.Provider>
    )
}

export default AdminApp