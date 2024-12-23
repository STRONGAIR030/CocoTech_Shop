import { Routes, Route} from "react-router";

import AdminContext from "./components/context/AdminContext"
import AdminCustomersPage from "./Page/admin/AdminCustomersPage"
import AdminHomePage from "./Page/admin/AdminHomePage"
import AdminLoginPage from "./Page/admin/AdminLoginPage"
import AdminOrdersPage from "./Page/admin/AdminOrdersPage"
import AdminProductsPage from "./Page/admin/AdminProductsPage"

const AdminApp = () => {
    return (
        <AdminContext.Provider
            value={{}}
        >
        <Routes>
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/home" element={<AdminHomePage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            {/* <Route path="/orders/:orderId" element={<OrderPage />} /> */}
            <Route path="/customers" element={<AdminCustomersPage />} />
            {/* <Route path="/customers/:customerId" element={<CheckOutPage />} /> */}
            <Route path="/products" element={<AdminProductsPage />} />
            {/* <Route path="/products/:productId" element={<ProductPage />} /> */}
            <Route path="*" element={<AdminHomePage />} />
        </Routes>
    </AdminContext.Provider>
    )
}

export default AdminApp