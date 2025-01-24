import styled from "styled-components"
import CheckOutLayout from "../../components/layout/CheckoutLayout"
import { useContext,  useMemo, useState } from "react"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import FrontContext from "../../components/context/FrontContext"
import ListSwitch from "../../components/common/ListSwitch"
import axios from "axios"
import { API_HOST } from "../../constants"
import { useNavigate } from "react-router"
import ErrorMessage from "../../components/common/ErrorMessage"
import PropTypes from "prop-types"

const UserInput = ({type, inputWidth, inputType, inputName, handleChange}) => {
    return (
        <StyledUserInput $inputWidth={inputWidth}>
            <h4>{type}</h4>
            <input onChange={handleChange} type={inputType ? inputType : "text"} name={inputName} placeholder={type} />
        </StyledUserInput>
    )
}

UserInput.propTypes = {
    type: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    inputWidth: PropTypes.string,
    inputType: PropTypes.string,
}

const UserRadio = ({radioText, inputValue, inputName, handleChange, children}) => {
    return (
        <StyledUserRadio>
            <input type="radio" name={inputName} value={inputValue} onChange={handleChange}/>
            <span/>
            {radioText}
            {children}
        </StyledUserRadio>
    )
}

UserInput.propTypes = {
    radioText: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    children: PropTypes.element,
}

const OrderProduct = ({productId, imgUrl, quantity, totalPrice, name, handleAdd, handleDec}) => {
    return (
        <StyledOrderProductContainer>
            <div>
                <StyledOrderProductImg $imgUrl={imgUrl}>
                    <div></div>
                </StyledOrderProductImg>
                <span>{quantity}</span>
            </div>
            <h3>{name}</h3>
            <h3>{totalPrice}$</h3>
            <div>
                <EditProductBtn onClick={() => {handleAdd(productId)}}>+</EditProductBtn>
                <EditProductBtn onClick={() => {handleDec(productId)}}>-</EditProductBtn>
            </div>
        </StyledOrderProductContainer>
    )
}

OrderProduct.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgUrl: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDec: PropTypes.func.isRequired,
}

const PAYMENT_METHODS = {
    CREDIT_CARD: "creditCard",
    CASH_ON_DELIVERY: "cashOnDelievery",
};

const SHIPPING_METHODS = {
    FAMILY_MART: "familyMart",
    SEVEN_ELEVEN: "seven",
    POST: "post",
};

const SHIPPING_COSTS = {
    [SHIPPING_METHODS.FAMILY_MART] : 60,
    [SHIPPING_METHODS.SEVEN_ELEVEN]: 60,
    [SHIPPING_METHODS.POST]: 100,
}

const DeliverySection = ({handleChange}) => {
    return (
        <>
            <UserInput inputWidth={100} type="Country" inputName="country" handleChange={handleChange}/>
            <UserInput inputWidth={50} type="Fist Name" inputName="firstName" handleChange={handleChange}/>
            <UserInput inputWidth={50} type="Last Name" inputName="lastName" handleChange={handleChange}/>
            <UserInput inputWidth={100} type="Adress" inputName="adress" handleChange={handleChange}/>
            <UserInput inputWidth={50} type="City" inputName="city" handleChange={handleChange}/>
            <UserInput inputWidth={50} type="Post Code" inputName="postCode" handleChange={handleChange}/>
        </>
    )
}

DeliverySection.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

const ShippingSection = ({handleChange}) => {
    return (
        <>
            <h3>Shipping method</h3>
            <UserRadio radioText="FamilyMart 60$" inputName="shipping" inputValue="familyMart" handleChange={handleChange}/>
            <UserRadio radioText="7-11 60$" inputName="shipping" inputValue="seven" handleChange={handleChange}/>
            <UserRadio radioText="Chunghwa Post 100$" inputName="shipping" inputValue="post" handleChange={handleChange}/>
        </>
    )
}

ShippingSection.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

const PaymentSection = ({handleChange, showCreditCardInf}) => {
    return (
        <>
            <h3>Payment</h3>
            <UserRadio radioText="Credit Card" inputName="payment" inputValue="creditCard" handleChange={handleChange}>
                <StyledCreditCardInf $show={showCreditCardInf}>
                        <UserInput inputWidth={100} type="Card number" inputName="cardNum" handleChange={handleChange} />
                        <UserInput inputWidth={50} type="Ex piration date" inputName="cardDate" handleChange={handleChange}/>
                        <UserInput inputWidth={50} inputType="number" type="security code" inputName="cardCode" handleChange={handleChange}/>
                        <UserInput inputWidth={100} type="name" inputName="cardName" handleChange={handleChange}/>
                    </StyledCreditCardInf>
            </UserRadio>
            <UserRadio radioText="Cash on delievery" inputName="payment" inputValue="cashOnDelievery" handleChange={handleChange}/>
        </>
    )
}

PaymentSection.propTypes = {
    handleChange: PropTypes.func.isRequired,
    showCreditCardInf: PropTypes.bool,
}

const OrderSummary = ({ handleAdd, handleDec, totalCost, shippingCost, cartData }) => {
    return (
        <>
            {
                cartData.length != 0 && cartData.map((product) => {
                    return <OrderProduct 
                                key={product.id} 
                                productId={product.id} 
                                totalPrice={product.totalPrice} 
                                quantity={product.quantity} 
                                name={product.name} 
                                imgUrl={product.imgUrl}
                                handleDec={handleDec} 
                                handleAdd={handleAdd} 
                            />
                })
            }
            <StyledCost>    
                <h3>SubTotal</h3>
                <h3>{totalCost}$</h3>
            </StyledCost>
            <StyledCost>    
                <h3>Shipping</h3>
                <h3>{shippingCost}$</h3>
            </StyledCost>
            <hr />
            <StyledCost>   
                <h3>Total</h3>
                <h3>{totalCost + shippingCost}$</h3>
            </StyledCost>
        </>
    )
}


OrderSummary.propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleDec: PropTypes.func.isRequired,
    totalCost: PropTypes.number.isRequired,
    shippingCost: PropTypes.number.isRequired,
    cartData: PropTypes.arrayOf(PropTypes.object),
}

const CheckOutPage = () => {
    const [showCreditCardInf, setShowCreditCard] = useState(false);
    const [errorText, setError] = useState("");
    const {shoppingCart, modifyProductToCart, userInf, clearShoppingCart} = useContext(FrontContext);
    const [showOrderSummaryMd, setShowOrderSummary] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        payment: PAYMENT_METHODS.CREDIT_CARD, 
      });

    const totalCost = useMemo(() => {
        return shoppingCart.reduce((prevValue, product) => product.totalPrice + prevValue, 0)
    }, [shoppingCart])

    const shippingCost = useMemo(() => {
        return SHIPPING_COSTS[formData.shipping] || 0;
    }, [formData.shipping])

    const goToOrderPage = () => navigate("/account/orders");

    const formatDate = (date) => {
        const Year = date.getFullYear();
        const Month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const Day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        return `${Year}-${Month}-${Day} ${hours}:${minutes}:${seconds}`
    }


    const handleChange = (e) => {

        const {name, value} = e.target;
        if(name == "payment")
            value == "creditCard" ?
            setShowCreditCard(true) :
            setShowCreditCard(false)
        setFormData(prevData => {
            const updateData = {
                ...prevData,
                [name]: value,
            }
            // console.log(updateData);
            return updateData 
        })

    }

    const verifyFormData = () => {
        const NecData = [
            "payment", "shipping", "country", 
            "firstName", "lastName", "adress", 
            "city", "postCode",
        ]

        const NecCreditData = [
            "cardName", "cardNum", "cardCode", "cardDate",
        ]

        console.log(formData);
        
        const isNonEmpty = (name) => formData[name] && formData[name] != ""

        if(!NecData.every(name => isNonEmpty(name))){
            setError("You need to enter all information")
            return false
        }

        if(formData.payment == "creditCard" && !NecCreditData.every(name => isNonEmpty(name))){
            setError("You need to enter all CreditCard information")
            return false
        }

        return true
    }

    const createNewOrder = () => {
        const orderProducts = shoppingCart.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity,
            }
        })

        const newOrder = {
            customersId: userInf.id || 0,
            detail: orderProducts,
            date: formatDate(new Date),
            shipping: shippingCost,
            subTotal: totalCost,
            status: 0,
        }

        return newOrder
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // verify form data
        if(verifyFormData()){
            setError("")
        }else{
            return
        }

        // create new order data
        const newOrder = createNewOrder();

        try{
            const postRes = await axios.post(`${API_HOST}/orders`, newOrder)
            console.log(postRes);
            clearShoppingCart();
            goToOrderPage();
        } catch (err) {
            console.error(err);
        }
      
    };

    const handleAdd = (productId) => {
        modifyProductToCart(productId, 1)
    }

    const handleDec = (productId) => {
        modifyProductToCart(productId, -1)
    }

    return (
        <CheckOutLayout>
            <StyledCheckOutPage>
                <ListSwitch 
                    mdShow 
                    handleClick={() => {setShowOrderSummary(prevShow => !prevShow)}} 
                    switchState={showOrderSummaryMd} 
                    padding={"16px"} 
                    text="Order Summary" 
                    textSize="24px" 
                    hrColor="#8D5524"
                />
                <StyledOrderSummaryMd $show={showOrderSummaryMd}>
                    <OrderSummary 
                        handleAdd={handleAdd}
                        handleDec={handleDec}
                        totalCost={totalCost}
                        shippingCost={shippingCost}
                        cartData={shoppingCart}
                    />
                </StyledOrderSummaryMd>
                <StyledUserInf>
                    <SyledOrderForm onSubmit={handleSubmit}>
                        <DeliverySection handleChange={handleChange} />
                        <ShippingSection handleChange={handleChange} />
                        <PaymentSection handleChange={handleChange} showCreditCardInf={showCreditCardInf}/>
                        <ErrorMessage errorText={errorText}/>
                        <input type="submit" value="submit to me"/>
                    </SyledOrderForm>
                </StyledUserInf>
                <StyledOrderSummaryXl>
                    <OrderSummary 
                        handleAdd={handleAdd}
                        handleDec={handleDec}
                        totalCost={totalCost}
                        shippingCost={shippingCost}
                        cartData={shoppingCart}
                    />
                </StyledOrderSummaryXl>
            </StyledCheckOutPage>
        </CheckOutLayout>
    )
}

export default CheckOutPage

const StyledCheckOutPage = styled.div`
    width: 100%;
    max-width: 1000px;
    min-height: 100vh;
    margin: 0px auto;
    display: flex;

    @media screen and (max-width: 746px) {
        max-width: 100%;

        display: block;
    }

`

const StyledUserInf = styled.div`
    width: 50%;
    padding: 16px;
    border-right: 1px black solid;

    @media screen and (max-width: 746px) {
        width: 100%;
    }
`
const SyledOrderForm = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    & > h3{
        width: 100%;
        padding: 16px 0px;
        font-size: 32px;
    }

    input[type="submit"]{
        width: 100%;
        margin: 16px 0px;
        padding: 8px;
        border-radius: 20px;
        border: none;
        background-color: #8D5524;
        color: #ffdd84;
    }
`

const StyledOrderSummaryXl = styled.div`
    width: 50%;

    hr{
        margin: 0px 16px;
        border: none;
        border-top: 2px #8D5524 solid;
    }

    @media screen and (max-width: 746px) {
        display: none;
    }

`

const StyledOrderSummaryMd = styled.div`
    width: 100%;
    max-height: ${props => props.$show ? "600" : "0"}px;
    overflow: scroll;
    display: none;
    transition: all 0.5s ease-out;

    hr{
        margin: 0px 16px;
        border: none;
        border-top: 2px #8D5524 solid;
    }

    @media screen and (max-width: 746px){
        display: block;
        
    }
`

const StyledUserInput = styled.div`
    width: ${props => props.$inputWidth || 100}%;
    /* border: 1px solid black; */
    padding: 4px 8px;
    
    input,h4{
        width: 100%;
        margin: 4px 0px;
        font-size: 18px;
    }

    input{
        border-radius: 10px;
        padding: 8px;
    }

`

const StyledCreditCardInf = styled.div`
    margin: ${props => props.$show ? 16 : 0}px;
    padding: ${props => props.$show ? 16 : 0}px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;
    background-color: #C68642;
    width: 100%;
    overflow: scroll;
    height: ${props => props.$show ? 300 : 0}px;
    visibility: ${props => props.$show ? "visible" : "hidden"};
    transition: all 0.5s;

    display: flex;
    flex-wrap: wrap;
`

const StyledUserRadio = styled.label`
    border-radius: 20px;
    border: 3px solid #8D5524;
    padding: 8px;
    margin: 8px 0px;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span{
        display: inline-block;
        width: 30px;
        height: 30px;
        /* border: 3px #8D5524 solid; */
        border-radius: 50%;
        margin-right: 16px;
        background-color: #ffdd847f;
    }

    input:checked ~ span{
        background-color: #8D5524;
    }

    input:checked ~ span::after{
        content: '';
        background-color: #F1C27D;
        border-radius: 50%;
        width: 100%;
        padding-top: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        animation: radioIn 0.2s both ease-out;

        @keyframes radioIn {
            0%{
                transform: translate(-50%, -50%) scale(1);
            }

            100%{
                transform: translate(-50%, -50%) scale(0.5);
            }
        }

    }

    input[type="radio"]{
        display: none;
    }
    
`

const StyledOrderProductContainer = styled.div`
    width: 100%;
    padding: 16px;
    /* border: 1px solid black; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;

    div{
        display: flex;
        justify-content: space-between;
    }

`

const StyledOrderProductImg = styled(StyledImgContainer)`
    border-radius: 20px;
    /* border: 2px #8D5524 solid; */
    width: 80px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;

    & ~ span{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid black;
        background-color: rgba(0, 0, 0, 0.9);
        color: #F1C27D;

        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -5px;
        top: -5px;
    }
`

const StyledCost = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: space-between;

    h3{
        font-size: 24px;
    }

`

const EditProductBtn = styled.button`
    margin: 4px;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 200px;
    font-size: 24px
`
