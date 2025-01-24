import { NavLink, useSearchParams } from "react-router";
import styled from "styled-components";
import DefaultLayout from "../../components/layout/defaultLayout";
import AdSection from "../../components/FrontComponents/AdSection";
import ProductSection from "../../components/FrontComponents/ProductSection";
import { useContext, useEffect } from "react";
import FrontContext from "../../components/context/FrontContext";
import LoadingAnimation from "../../components/common/LoadingAnimation";

const ShopPage = () => {
    const { productsDataLoaded, fetchProductsData } = useContext(FrontContext);
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search");

    useEffect(() => {
        if (!productsDataLoaded) {
            setTimeout(() => {
                fetchProductsData();
            }, 3000);
        }
    }, [productsDataLoaded]);

    return (
        <DefaultLayout>
            {productsDataLoaded ? (
                <StyledShopPage>
                    {!searchText && <AdSection />}
                    <ProductSection searchText={searchText} />
                </StyledShopPage>
            ) : (
                <LoadingAnimation />
            )}
        </DefaultLayout>
    );
};

export default ShopPage;

const StyledShopPage = styled.main`
    animation: PageIn 0.5s both;

    @keyframes PageIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;
