import { NavLink } from "react-router"
import styled from "styled-components"
import StyledImgContainer from "../common/StyledImgContainer"
import { useContext } from "react"
import FrontContext from "../context/FrontContext"

const ProductCard = ({productId, imgUrl, name, price}) => {
    const {modifyProductToCart}= useContext(FrontContext);

    return (
        <StyledProductCard>
            <NavLink to={`/product/${productId}`}>
                <ProductImgContainer $imgUrl={imgUrl}>
                    <div/>
                </ProductImgContainer>
            </NavLink>
            <h3>{name}</h3>
            <CostandBuy>
                <h4>{price}$</h4>
                <button onClick={() => {modifyProductToCart(productId, 1, name, imgUrl, price)}}>Add to Cart</button>
            </CostandBuy>
        </StyledProductCard>
    )
}

export default ProductCard

const ProductImgContainer = styled(StyledImgContainer)`
    border-radius: 20px;
    margin-bottom: 16px;
    background-color: rgba(181, 196, 222, 0.4);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;

    div{
        transition: all 0.3s;        
    }

`

const StyledProductCard = styled.div`
    background-color: #E0AC69;
    border-radius: 20px;
    padding: 16px;
    margin: 16px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
    transition: all 0.3s ease-out;

    h3{
        margin: 8px 0px;
    }

    &:hover {
        transform: translateY(-8px);
        ${ProductImgContainer} div{
            transform: scale(1.2);
        }
    }

`

const CostandBuy = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4{
        font-size: 18px;
    }

    button{
        padding: 8px;
        border: none;
        color: #ffdd84;
        border-radius: 100px;
        background-color: #8D5524;

        &:active{
            background-color:#5a3616;
        }
    }

`
