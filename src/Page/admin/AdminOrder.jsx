import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import GoBackButton from "../../components/common/GoBackButton"

const AdminOrder = () => {
    return (
        <AdminLayout>
            <StyledOrderPage>
                <GoBackButton/>
            </StyledOrderPage>
        </AdminLayout>
    )
}

export default AdminOrder

const StyledOrderPage = styled.div`
    width: 100%;
    padding: 16px;
`