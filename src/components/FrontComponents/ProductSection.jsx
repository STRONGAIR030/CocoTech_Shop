import styled from "styled-components"
import ProductCard from "./ProductCard"
import { useContext } from "react"
import FrontContext from "../context/FrontContext"
import PropTypes from "prop-types"

const renderProductList = (productList, searchText) => {
    const filterList = searchText ? 
        productList.filter((product) => {
            const findText = searchText.toLowerCase();
            const productName = product.name.toLowerCase();
            return productName.includes(findText)
        }) :
        productList;

    return filterList.map((product) => {
                return(
                    <ProductCard 
                        key={product.id}  
                        productId={product.id} 
                        imgUrl={product.img[0]} 
                        name={product.name} 
                        price={product.price}
                    />
                )
            })
}

const ProductSection = ({searchText}) => {
    const {productList} = useContext(FrontContext)

    return (
        <StlyedProductSection>
            <ProductContiainerWrapper>
                <h3>{searchText ? `Shearch by "${searchText}"` :"Get All You want!"}</h3>
                <StlyedProductCardContainer>
                    {
                        productList && renderProductList(productList, searchText)
                    }
                </StlyedProductCardContainer>
            </ProductContiainerWrapper>
        </StlyedProductSection>
    )
}

ProductSection.propTypes = {
    searchText: PropTypes.string,
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
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));

    @media screen and (max-width: 746px){
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    }
`