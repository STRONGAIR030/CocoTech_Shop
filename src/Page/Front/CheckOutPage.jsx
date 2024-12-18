import styled from "styled-components"
import CheckOutLayout from "../../components/layout/CheckoutLayout"
import { useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import StyledImgContainer from "../../components/common/StyledImgContainer"

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

const OrderProduct = () => {
    return (
        <StyledOrderProductContainer>
            <StyledImgContainer $imgUrl="/img/powerBank_product.png">
                <div></div>
            </StyledImgContainer>
            <h3>productName</h3>
            <h3>400$</h3>
            <StyledImgContainer $imgUrl="/img/edit.svg" $containerWidth="60px">
                <div/>
            </StyledImgContainer>
        </StyledOrderProductContainer>
    )
}

const CheckOutPage = () => {
    const [showCreditCardInf, setshowCreditCard] = useState(false);
    const [errorText, setError] = useState("");
    const [errorKey, setKey] = useState(uuidv4());
    const [formData, setFormData] = useState({
        payment: "creditCard", // 預設支付方式
      });

    useEffect(() => {
        setKey(uuidv4())
    }, [errorText])

    const handlePaymentSelect = (e) => {
      e.target.value == "creditCard" ?
            setshowCreditCard(true) :
            setshowCreditCard(false)
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

    const handleSubmit = (e) => {
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


        console.log(formData);
        
      };
    return (
        <CheckOutLayout>
            <StyledCheckOutPage>
                <StyledOrderSummaryMd>

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
                            <UserRadio radioText="FamilyMart" inputName="shipping" inputValue="familyMart" handleChange={handleChange}/>
                            <UserRadio radioText="7-11" inputName="shipping" inputValue="seven" handleChange={handleChange}/>
                            <UserRadio radioText="Chunghwa Post" inputName="shipping" inputValue="post" handleChange={handleChange}/>

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
                    <OrderProduct/>
                </StyledOrderSummaryXl>
            </StyledCheckOutPage>
        </CheckOutLayout>
    )
}

export default CheckOutPage

const StyledCheckOutPage = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;

    @media screen and (max-width: 746px) {
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

    @media screen and (max-width: 746px) {
        display: none;
    }

`

const StyledOrderSummaryMd = styled.div`
    width: 100%;
    display: none;


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
        background-color: rgba(255, 221, 132, 0.5);
    }

    input:checked ~ span{
        background-color: #8D5524;
    }

    input:checked ~ span::after{
        content: '';
        background-color: #F1C27D;
        border-radius: 50%;
        width: 50%;
        padding-top: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    input[type="radio"]{
        display: none;
    }
    
`

const StyledOrderProductContainer = styled.div`
    width: 100%;
    padding: 16px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    div,h3{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    
    ${StyledImgContainer} {
        border-radius: 20px;
        border: 2px #8D5524 solid;
        width: 100px;
    }

`

// const StyledOrderProductImg = styled.div`
//     width: 100%;
//     padding: 16px;
//     border: 1px solid black;

//     ${StyledImgContainer} {
//         border: 2px #8D5524 solid;
//         flex: 0 0 30%;
//     }
// `