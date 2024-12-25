import styled from "styled-components"

import AdminHeader from "./AdminHeader"
import AdminSiderBar from "./AdminSiderBar"
import { useState } from "react"

const AdminLayout = ({children}) => {
    const [showSiderBar, setShowSiderBar] = useState(false);

    const toggleShowSiderBar = () => {
        setShowSiderBar(prevShow => !prevShow)
    }

    return (
        <Wrapper>
            <AdminHeader toggleShowSiderBar={toggleShowSiderBar}/>
            <StyledClearfix/>
            <StyledMain>
                <AdminSiderBar showSiderBar={showSiderBar}>
                    {children}
                </AdminSiderBar>
            </StyledMain>

        </Wrapper>
    )
}

export default AdminLayout

const StyledClearfix = styled.div`
    height: 60px;
    @media screen and (max-width: 746px){
        height: 50px;
    }
`

const StyledMain = styled.main`
    width: 100%;
    display: flex;
`

const Wrapper = styled.div`
    width: 100%;
    background-color: ${props => props.$wrapperColor || "#c68642b2"};
`