import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import StyledTableContainer from "../../components/common/StyledTableContainer"
import { useContext, useEffect } from "react"
import AdminContext from "../../components/context/AdminContext"
import { useNavigate } from "react-router"
import StyledImgContainer from "../../components/common/StyledImgContainer"

const Customer = ({customerId, customerName, customerEmail, handleClick}) => {
    return (
        <tr>
            <td>{customerId}</td>
            <td>{customerEmail}</td>
            <td>{customerName}</td>
            <td>
                <button onClick={() => {handleClick(customerId)}}>
                    <StyledImgContainer $imgUrl="/img/veiw.svg">
                        <div/>
                    </StyledImgContainer>
                </button>
            </td>
        </tr>
    )
}

const AdminCustomersPage = () => {
    const {fetchCustomerList, customerList, customerDataLoaded} = useContext(AdminContext);
    const navigtion = useNavigate();

    const goAdminCustomerById = (customerId) => navigtion(`/admin/customers/${customerId}`)

    useEffect(() => {
        fetchCustomerList();
    }, [])

    return (
        <AdminLayout>
            <StyledAdminCustomersPage>
                <h3>Customers List</h3>
                <StyledTableContainer>
                    <table>
                        <tbody>
                            <tr>
                                <th>Customer ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Orders</th>
                            </tr>
                            {
                                customerDataLoaded && customerList.map((customer) => {
                                    return <Customer 
                                            key={customer.id} 
                                            customerId={customer.id} 
                                            customerName={customer.name} 
                                            customerEmail={customer.email} 
                                            handleClick={goAdminCustomerById}
                                            />
                                })
                            }
                        </tbody>
                    </table>
                </StyledTableContainer>
            </StyledAdminCustomersPage>
        </AdminLayout>
    )
}

export default AdminCustomersPage

const StyledAdminCustomersPage = styled.div`
    width: 100%;
    padding: 16px;

    td button {
        width: 50px;
        border-radius: 15px;
        padding: 8px;
        cursor: pointer;
    }
`