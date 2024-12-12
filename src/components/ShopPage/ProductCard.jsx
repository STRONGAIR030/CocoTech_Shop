import { NavLink } from "react-router"
import styled from "styled-components"

const ProductCard = ({productInf}) => {
    return (
        <StyledProductCard>
            <ProductImgContainer to={`/product/${productInf.id}`} $imgUrl={productInf.img[0]}>
                <div/>
            </ProductImgContainer>
            <h3>{productInf.name}</h3>
            <CostandBuy>
                <h4>{productInf.price}$</h4>
                <button>Add to Cart</button>
            </CostandBuy>
        </StyledProductCard>
    )
}

export default ProductCard

const ProductImgContainer = styled(NavLink)`
    display: block;
    width: 100%;
    height: 250px;
    border-radius: 20px;
    margin-bottom: 16px;
    background-color: rgba(181, 196, 222, 0.4);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
    div{
        width: 100%;
        height: 100%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-image: url(${props => props.$imgUrl});
        background-size: 70%;
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
            transform: scale(1.3);
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
