import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import StyledTableContainer from "../../components/common/StyledTableContainer"
import { useContext, useEffect, useState } from "react"
import AdminContext from "../../components/context/AdminContext"

const AdminOrdersPage = () => {
    const {orderList, fetchOrderList, orderDataLoaded} = useContext(AdminContext)

    useEffect(() => {
        fetchOrderList();
    }, [])

    return (
        <AdminLayout>
            <StyledOrdersPage>
                <h3>Order List</h3>
                <StyledTableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <td>Order ID</td>
                                <td>Customer</td>
                                <td>Status</td>
                                <td>Date</td>
                                <td>Total</td>
                                <td>Edit</td>
                            </tr>
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
` 



