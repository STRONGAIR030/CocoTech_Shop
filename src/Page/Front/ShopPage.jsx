
import { NavLink } from "react-router"
import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"
import AdSection from "../../components/FrontComponents/AdSection"
import ProductSection from "../../components/FrontComponents/ProductSection"
import { useContext, useEffect } from "react"
import AppContext from "../../components/common/AppContext"
import LoadingAnimation from "../../components/common/LoadingAnimation"

const ShopPage = () => {
    const {productsDataLoaded, fetchProductsData} = useContext(AppContext);


    useEffect(() => {
        if(!productsDataLoaded){
            setTimeout(() => {
                fetchProductsData()
            }, 3000)
        }
    }, [productsDataLoaded])

    return (
        <DefaultLayout>
        {productsDataLoaded ? 
            <StyledShopPage>    
                <AdSection/>
                <ProductSection/>
            </StyledShopPage> :
            <LoadingAnimation/>
        }
        </DefaultLayout>
    )
}

export default ShopPage

const StyledShopPage = styled.main`
    animation: PageIn 0.5s both;

    @keyframes PageIn {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`

