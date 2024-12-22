import styled from "styled-components"

import AdminHeader from "./AdminHeader"



const AdminLayout = ({children}) => {
    return (
        <div>
            <AdminHeader/>
            <StyledClearfix/>
            {children}
        </div>
    )
}

export default AdminLayout

const StyledClearfix = styled.div`
    height: 60px;
    @media screen and (max-width: 746px){
        height: 50px;
    }
`
