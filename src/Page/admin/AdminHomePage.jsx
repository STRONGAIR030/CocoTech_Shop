import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useNavigate } from "react-router"
import { useContext, useEffect } from "react"
import AdminContext from "../../components/context/AdminContext"

const AdminHomePage = () => {
    const {adminInf} = useContext(AdminContext)
    const navgation = useNavigate()

    const goAdminLoginPage = () => navgation("/admin/login")

    useEffect(() => {
        if(!adminInf.isSignIn){
            goAdminLoginPage();
        }
    }, [adminInf])
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
