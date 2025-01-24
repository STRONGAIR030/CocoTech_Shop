import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useContext, useEffect, useMemo } from "react"
import AdminContext from "../../components/context/AdminContext"
import { useNavigate } from "react-router"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import AdminTable from "../../components/common/AdminTable"
import PropTypes from "prop-types"

const VeiwCustomerButton = ({customerId}) => {
    const navigtion = useNavigate();

    const goAdminCustomerById = () => navigtion(`/admin/customers/${customerId}`)

    return (
        <button onClick={goAdminCustomerById}>
            <StyledImgContainer $imgUrl="/img/veiw.svg">
                <div/>
            </StyledImgContainer>
        </button>
    )
}

VeiwCustomerButton.propTypes = {
    customerId: PropTypes.string.isRequired,
}

const customerListHeaders = [
    { label: "Customer ID", key: "id"},
    { label: "Email", key: "email"},
    { label: "Name", key: "name"},
    { label: "Orders", key: "veiwButton"},
]

const AdminCustomersPage = () => {
    const {fetchCustomerList, customerList, customerDataLoaded} = useContext(AdminContext);

    const customerListDatas = useMemo(() => {
        return customerList.map((customer) => {
            return {
                ...customer,
                veiwButton: <VeiwCustomerButton customerId={customer.id} />,
            }
        })   
    })

    useEffect(() => {
        fetchCustomerList();
    }, [])

    return (
        <AdminLayout>
            <StyledAdminCustomersPage>
                <h3>Customers List</h3>
                <AdminTable
                    headers={customerListHeaders}
                    datas={customerListDatas}
                    dataLoaded={customerDataLoaded}
                />
            </StyledAdminCustomersPage>
        </AdminLayout>
    )
}

export default AdminCustomersPage

const StyledAdminCustomersPage = styled.div`
    width: 100%;
    padding: 16px;

    & > h3 {
        font-size: 24px;
        padding: 16px 0px;
    }

    td button {
        width: 50px;
        border-radius: 15px;
        padding: 8px;
        cursor: pointer;
    }
`