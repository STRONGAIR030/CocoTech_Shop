import styled from "styled-components"
import CheckOutLayout from "../../components/layout/CheckoutLayout"

const UserInput = ({type, inputWidth}) => {
    return (
        <StyledUserInput $inputWidth={inputWidth}>
            <h4>{type}</h4>
            <input type="text" placeholder={type} />
        </StyledUserInput>
    )
}

const CheckOutPage = () => {
    return (
        <CheckOutLayout>
            <StyledCheckOutPage>
                <StyledOrderSummaryMd>

                </StyledOrderSummaryMd>
                <StyledUserInf>
                    <SyledOrderForm>
                        <h3>Delivery</h3>
                        <UserInput inputWidth={100} type="Country"/>
                        <UserInput inputWidth={50} type="Fist Name"/>
                        <UserInput inputWidth={50} type="Last Name"/>
                        <UserInput inputWidth={100} type="Adress"/>
                        <UserInput inputWidth={50} type="City"/>
                        <UserInput inputWidth={50} type="Post Code"/>

                        <h3>Shipping method</h3>
                            <label htmlFor="">
                                <input type="radio" name="Shipping"/>
                                yee
                            </label>
                            <label htmlFor="">
                                <input type="radio" name="Shipping"/>
                                yee
                            </label>
                            <label htmlFor="">
                                <input type="radio" name="Shipping"/>
                                yee
                            </label>

                    </SyledOrderForm>


                </StyledUserInf>
                <StyledOrderSummaryXl>

                </StyledOrderSummaryXl>
            </StyledCheckOutPage>
        </CheckOutLayout>
    )
}

export default CheckOutPage

const StyledCheckOutPage = styled.div`
    width: 100%;
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

    h3{
        width: 100%;
        padding: 16px 0px;
        font-size: 32px;
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
    border: 1px solid black;
    padding: 8px;
    
    input,h4{
        width: 100%;
        margin: 8px 0px;
    }

    input{
        padding: 8px;
        font-size: 18px;
        border: none;
    }
`