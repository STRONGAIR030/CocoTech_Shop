import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"

const AdminHomePage = () => {
    return (
        <AdminLayout>
            <StyledHomePage>
                AdminHomePage
            </StyledHomePage>
        </AdminLayout>
    )
}

export default AdminHomePage

const StyledHomePage = styled.div`
    width: 100%;
`
