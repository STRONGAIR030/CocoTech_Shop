import styled from "styled-components"
import CheckOutLayout from "../../components/layout/CheckoutLayout"
import { useContext, useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import FrontContext from "../../components/context/FrontContext"
import ListSwitch from "../../components/common/ListSwitch"
import axios from "axios"
import API_HOST from "../../constants"
import { useNavigate } from "react-router"
import { use } from "react"

const UserInput = ({type, inputWidth, inputType, inputName, handleChange}) => {
    return (
        <StyledUserInput $inputWidth={inputWidth}>
            <h4>{type}</h4>
            <input onChange={handleChange} type={inputType ? inputType : "text"} name={inputName} placeholder={type} />
        </StyledUserInput>
    )
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

const CheckOutPage = () => {
    const [showCreditCardInf, setshowCreditCard] = useState(false);
    const [errorText, setError] = useState("");
    const [errorKey, setKey] = useState(uuidv4());
    const {shoppingCart, modifyProductToCart, userInf, clearShoppingCart} = useContext(FrontContext);
    const [showOrderSummaryMd, setShowOrderSummary] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        payment: "creditCard", 
      });

    useEffect(() => {
        setKey(uuidv4())
    }, [errorText])

    const totalCost = useMemo(() => {
        return shoppingCart.reduce((prevValue, product) => product.totalPrice + prevValue, 0)
    }, [shoppingCart])

    const ShippingCost = useMemo(() => {
        return formData.shipping == "seven" || formData.shipping == "familyMart" ? 
                                    60 : 
                                    formData.shipping == "post" ?
                                    100 :
                                    0 
    }, [formData.shipping])

    const goToOrderPage = () => navigate("/account/orders");

    const dateFormat = (date) => {
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
            setshowCreditCard(true) :
            setshowCreditCard(false)
        setFormData(prevData => {
            const updateData = {
                ...prevData,
                [name]: value,
            }
            // console.log(updateData);
            return updateData 
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const NecData = [
            "payment", "shipping", "country", 
            "firstName", "lastName", "adress", 
            "city", "postCode",
        ]
        const NecCreditData = [
            "cardName", "cardNum", "cardCode", "cardDate",
        ]

        if(!NecData.every(name => formData[name] && formData[name] != "")){
            setError("You need to enter all information")
            return
        }

        if(formData.payment == "creditCard" && !NecCreditData.every(name => formData[name] && formData[name] != "")){
            setError("You need to enter all CreditCard information")
            return
        }

        setError("")

        const orderProducts = shoppingCart.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity,
            }
        })

        const postOrderData = {
            customersId: userInf.id,
            detail: orderProducts,
            date: dateFormat(new Date),
            shipping: ShippingCost,
            subTotal: totalCost,
            status: 0,
        }

        try{
            const postRes = await axios.post(`${API_HOST}/orders`, postOrderData)

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
                <ListSwitch mdShow handleClick={() => {setShowOrderSummary(prevShow => !prevShow)}} switchState={showOrderSummaryMd} padding={"16px"} text="Order Summary" textSize="24px" hrColor="#8D5524"/>
                <StyledOrderSummaryMd $show={showOrderSummaryMd}>
                    {
                        shoppingCart.length != 0 && shoppingCart.map((product) => {
                            return <OrderProduct key={product.id} quantity={product.quantity} name={product.name} totalPrice={product.totalPrice} imgUrl={product.imgUrl}/>
                        })
                    }
                    <StyledCost>    
                        <h3>SubTotal</h3>
                        <h3>{totalCost}$</h3>
                    </StyledCost>
                    <StyledCost>    
                        <h3>Shipping</h3>
                        <h3>{ShippingCost}$</h3>
                    </StyledCost>
                    <hr />
                    <StyledCost>   
                        <h3>Total</h3>
                        <h3>{totalCost + ShippingCost}$</h3>
                    </StyledCost>
                </StyledOrderSummaryMd>
                <StyledUserInf>
                    <SyledOrderForm onSubmit={handleSubmit}>
                        <h3>Delivery</h3>
                        <UserInput inputWidth={100} type="Country" inputName="country" handleChange={handleChange}/>
                        <UserInput inputWidth={50} type="Fist Name" inputName="firstName" handleChange={handleChange}/>
                        <UserInput inputWidth={50} type="Last Name" inputName="lastName" handleChange={handleChange}/>
                        <UserInput inputWidth={100} type="Adress" inputName="adress" handleChange={handleChange}/>
                        <UserInput inputWidth={50} type="City" inputName="city" handleChange={handleChange}/>
                        <UserInput inputWidth={50} type="Post Code" inputName="postCode" handleChange={handleChange}/>

                        <h3>Shipping method</h3>
                            <UserRadio radioText="FamilyMart 60$" inputName="shipping" inputValue="familyMart" handleChange={handleChange}/>
                            <UserRadio radioText="7-11 60$" inputName="shipping" inputValue="seven" handleChange={handleChange}/>
                            <UserRadio radioText="Chunghwa Post 100$" inputName="shipping" inputValue="post" handleChange={handleChange}/>

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
                        {
                            errorText && 
                            <ErrorContainer key={errorKey}>
                                <h3>{errorText}</h3>
                            </ErrorContainer>
                        }

                        <input type="submit" value="submit to me"/>

                    </SyledOrderForm>


                </StyledUserInf>
                <StyledOrderSummaryXl>
                    {
                        shoppingCart.length != 0 && shoppingCart.map((product) => {
                            return <OrderProduct key={product.id} productId={product.id} handleDec={handleDec} handleAdd={handleAdd} quantity={product.quantity} name={product.name} totalPrice={product.totalPrice} imgUrl={product.imgUrl}/>
                        })
                    }
                    <StyledCost>    
                        <h3>SubTotal</h3>
                        <h3>{totalCost}$</h3>
                    </StyledCost>
                    <StyledCost>    
                        <h3>Shipping</h3>
                        <h3>{ShippingCost}$</h3>
                    </StyledCost>
                    <hr />
                    <StyledCost>   
                        <h3>Total</h3>
                        <h3>{totalCost + ShippingCost}$</h3>
                    </StyledCost>
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


const StyledDeliverySection= styled.div`
    
`

const StyledShippingSection = styled.div`
    
`

const StyledPaymentsection = styled.div`
    
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
const ErrorContainer = styled.div`
    width: 100%;
    height: 50px;
    margin: 16px 0px;
    padding: 8px;
    border-radius: 20px;
    border: 2px solid red;
    background-color: rgba(255, 0, 0, 0.2);
    text-align: center;
    animation: ErrorIn 0.2s 2 both;

    @keyframes ErrorIn {
        0%{
            transform: rotate(0deg);
        }
        25%{
            transform: rotate(5deg);
        }
        50%{
            transform: rotate(0deg);
        }
        75%{
            transform: rotate(-5deg);
        }
        100%{
            transform: rotate(0deg)
        }
    }

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

const OrderSummarySwitch = styled(ListSwitch)`
    display: none;

    @media screen and (max-width: 746px){
        display: block;
        
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
