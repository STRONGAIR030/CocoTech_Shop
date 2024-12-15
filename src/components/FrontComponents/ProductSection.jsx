import styled from "styled-components"
import ProductCard from "./ProductCard"
import { useContext } from "react"
import AppContext from "../common/AppContext"

const ProductSection = () => {
    const {productList} = useContext(AppContext)

    return (
        <StlyedProductSection>
            <ProductContiainerWrapper>
                <h3>Get All You want!</h3>
                <StlyedProductCardContainer>
                    {
                        productList.map((product) => {
                            return(
                                <ProductCard key={product.id}  productId={product.id} imgUrl={product.img[0]} name={product.name} price={product.price}/>
                            )
                        })
                    }
                </StlyedProductCardContainer>
            </ProductContiainerWrapper>
        </StlyedProductSection>
    )
}

export default ProductSection 

const StlyedProductSection = styled.section`
    padding: 16px;

    h3:first-child{
        width: 100%;
        text-align: center;
        font-size: 48px;
        margin-bottom: 16px;
    }
`

const ProductContiainerWrapper = styled.div`
    width: 100%;
    border-radius: 20px;
    background-color: #C68642;
    padding-top: 16px;
`

const StlyedProductCardContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    @media screen and (max-width: 746px){
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }
`