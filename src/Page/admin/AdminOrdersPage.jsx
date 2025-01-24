import styled from "styled-components";
import AdminLayout from "../../components/layout/AdminLayout";
import { useContext, useEffect, useMemo } from "react";
import AdminContext from "../../components/context/AdminContext";
import EditOrderButton from "../../components/common/EditOrderButton";
import AdminTable from "../../components/common/AdminTable";

const orderListHeaders = [
    { label: "Order id", key: "id" },
    { label: "Customer", key: "customerName" },
    { label: "Status", key: "status" },
    { label: "Date", key: "date" },
    { label: "Total", key: "total", unitSymbol: "$" },
    { label: "Edit", key: "editButton" },
];

const AdminOrdersPage = () => {
    const { orderList, fetchOrderList, orderDataLoaded } =
        useContext(AdminContext);

    const orderListDatas = useMemo(() => {
        return orderList.map((order) => {
            return {
                ...order,
                editButton: <EditOrderButton orderId={order.id} />,
            };
        });
    }, [orderList]);

    useEffect(() => {
        fetchOrderList();
    }, []);

    return (
        <AdminLayout>
            <StyledOrdersPage>
                <h3>Order List</h3>
                <AdminTable
                    headers={orderListHeaders}
                    datas={orderListDatas}
                    dataLoaded={orderDataLoaded}
                />
            </StyledOrdersPage>
        </AdminLayout>
    );
};

export default AdminOrdersPage;

const StyledOrdersPage = styled.div`
    width: 100%;
    padding: 16px;

    h3 {
        font-size: 24px;
        padding: 16px 0px;
    }
`;
