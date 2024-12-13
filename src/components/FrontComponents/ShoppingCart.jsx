import styled from "styled-components"
import StyledImgContainer from "../common/StyledImgContainer"

const ShoppingCart = ({toggleShow}) => {
    

    return (
        <StyledShoppingCart>
            <ClossBtn onClick={toggleShow}>X</ClossBtn>
            <ShoppingCartContainer>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
                <CartProduct>
                    <DeleteBtn>X</DeleteBtn>                    
                    <ProductImgContainer $imgUrl="http://localhost:3000/powerBank1.png">
                        <div/>
                    </ProductImgContainer>
                    <h3>Product name</h3>
                    <h4>quantity: 1</h4>
                </CartProduct>
            </ShoppingCartContainer>
        </StyledShoppingCart>
    )
}

export default ShoppingCart

const StyledShoppingCart = styled.div`
    backdrop-filter:blur(5px);
    padding: 200px 16px;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.37);
    z-index: 99;
    animation: CartIn 0.5s both;

    @keyframes CartIn {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    @media screen and (max-width: 540px){
        padding-top: 150px;
        
    }
`

const ShoppingCartContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
    border-radius: 20px;
    background-color: #8D5524;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 5px 15px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  
`

const ClossBtn = styled.button`
    margin: 48px;
    padding: 4px 24px;
    font-size: 14px;
    border-radius: 100px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;

    position: absolute;
    right: 0px;
    top: 0px;

    @media screen and (max-width: 540px){
        margin: 48px 16px;
    }
    
`
const CartProduct = styled.div`
    margin: 16px 0px;
    width: 30%;
    text-align: center;

    h3,h4{
        margin-top: 8px;
    }

    

    @media screen and (max-width: 375px){
        width: 45%;

        h3,h4{
            font-size: 14px;
        }
    }
`

const ProductImgContainer = styled(StyledImgContainer)`
    background-color: #ffdd84;
    border-radius: 10px; 
`

const DeleteBtn = styled.button`
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 100px;
    transform: translate(50%, -40%);


    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1;
`

