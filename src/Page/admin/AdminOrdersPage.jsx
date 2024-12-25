import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import StyledTableContainer from "../../components/common/StyledTableContainer"
import { useContext, useEffect, useState } from "react"
import AdminContext from "../../components/context/AdminContext"
import { useNavigate } from "react-router"
import StyledImgContainer from "../../components/common/StyledImgContainer"

const AdminOrdersPage = () => {
    const {orderList, fetchOrderList, orderDataLoaded} = useContext(AdminContext);
    const navigate = useNavigate();

    const goAdminOrderById = (orderId) => {
        navigate(`/admin/orders/${orderId}`)
    } 

    useEffect(() => {
        fetchOrderList();
    }, [])

    return (
        <AdminLayout>
            <StyledOrdersPage>
                <h3>Order List</h3>
                <StyledTableContainer $maxWidth="800px">
                    <table>
                        <tbody>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Edit</th>
                            </tr>
                            {
                                orderDataLoaded && orderList.length && orderList.map((order) => {
                                    return (
                                        <tr>
                                            <td>{order.id}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.status}</td>
                                            <td>{order.date}</td>
                                            <td>{order.total}$</td>
                                            <td>
                                                <button 
                                                onClick={() => {goAdminOrderById(order.id)}}
                                                >
                                                    <StyledImgContainer $imgUrl="/img/orderEdit.svg">
                                                        <div/>
                                                    </StyledImgContainer>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </StyledTableContainer>
            </StyledOrdersPage>
        </AdminLayout>
    )
}

export default AdminOrdersPage

const StyledOrdersPage = styled.div`
    width: 100%;
    padding: 16px;

    h3{
        padding: 16px 0px;
    }

    td button {
        width: 40px;
        border-radius: 15px;
        padding: 8px;
        cursor: pointer;
    }
` 



