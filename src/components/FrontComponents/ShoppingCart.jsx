import styled from "styled-components"
import StyledImgContainer from "../common/StyledImgContainer"
import { useContext, useMemo} from "react"
import FrontContext from "../context/FrontContext"
import { NavLink } from "react-router"
import { ACTION_DELETE } from "../../constants"
import PropTypes from "prop-types"

const CartProduct = ({productId, name, quantity, totalPrice, imgUrl, handleDelete}) => {
    return (
        <StyledCartProductContainer>
            <StyledCartProduct>
                <DeleteBtn onClick={() => {handleDelete(productId)}}>X</DeleteBtn>                    
                <ProductImgContainer $imgUrl={imgUrl}>
                    <div/>
                </ProductImgContainer>
                <h3>{name}</h3>
                <h4>total: {totalPrice}$</h4>
                <h4>quantity: {quantity}</h4>
            </StyledCartProduct>
        </StyledCartProductContainer>
    )
}

CartProduct.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,

}


const ShoppingCart = ({toggleShow}) => {
    const {shoppingCart, modifyProductToCart} = useContext(FrontContext)
    const totalCost = useMemo(() => {
        return shoppingCart.reduce((prevValue, product) => product.totalPrice + prevValue, 0)
    })
    
    const handleDelete = (productId) => {
        if (!productId) return console.warn("Invalid productId provided");
        modifyProductToCart(productId, ACTION_DELETE)
    }

    return (
        <StyledShoppingCart>
            <ClossBtn onClick={toggleShow}>X</ClossBtn>
            {   
                shoppingCart.length ?
                <ShoppingCartContainer>
                    {
                        shoppingCart.map((product) => {
                            return (
                                <CartProduct 
                                    key={product.id} 
                                    productId={product.id} 
                                    handleDelete={handleDelete} 
                                    name={product.name} 
                                    quantity={product.quantity} totalPrice={product.totalPrice} imgUrl={product.imgUrl}
                                />
                            )
                        })
                    }
                    <CheckOutBtn to="/checkout">checkout--{totalCost}$</CheckOutBtn>
                </ShoppingCartContainer>:
                <ShoppingCartContainer>
                    <StyledNoProduct>
                        <h3>No thing in here!!</h3>
                        <NavLink to="/" onClick={toggleShow}>Go shopping</NavLink>
                    </StyledNoProduct>
                </ShoppingCartContainer>
            }
        </StyledShoppingCart>
    )
}

ShoppingCart.propTypes = {
    toggleShow: PropTypes.func.isRequired,
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
    animation: ContainerIn 0.5s;

    display: flex;
    flex-wrap: wrap;

    @keyframes ContainerIn {
        0%{
            transform: scale(1.3);
        }

        100%{
            transform: scale(1);
        }
    }
  
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

const StyledCartProductContainer = styled.div`
    width: 33.33%;
    padding: 16px;

    h3,h4{
        margin-top: 8px;
    }


    @media screen and (max-width: 375px){
        width: 50%;

        h3,h4{
            font-size: 14px;
        }
    }
`

const StyledCartProduct = styled.div`
    width: 100%;
    text-align: center;
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

const StyledNoProduct = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3{
        font-size: 25px;
        padding: 16px;
    }

    a{
        color: #ffdd84;
        font-size: 24px;
        margin: 16px;
    }

`

const CheckOutBtn = styled(NavLink)`
    flex:0 0 100%;
    padding: 8px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    border-radius: 10px;
    background-color: #ffdd84;
    color: #8D5524;
`

const CartProducts = styled.div`
    width: 100%;
`