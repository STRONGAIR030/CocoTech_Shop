import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"
import { useEffect, useState } from "react"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import axios from "axios"
import API_HOST from "../../ApiHost"
import LoadingAnimation from "../../components/common/LoadingAnimation"

const OrderProduct = ({imgUrl, quantity, price, name}) => {
    return (
        <StyledOrderProductContainer>
            <div>
                <StyledOrderProductImg $imgUrl={imgUrl}>
                    <div></div>
                </StyledOrderProductImg>
                <span>{quantity}</span>
            </div>
            <h3>{name}</h3>
            <h3>{Number(price) * quantity}$</h3>
        </StyledOrderProductContainer>
    )
}

const Order = ({orderId, orderProducts, orderStatus, orderDate, orderTotal}) => {
    const handlers = {
        0: "incomplete",
        1: "shipping",
        2: "complete",
    }

    return (
        <StyledOrder>
            <h3>Order id: {orderId}</h3>
            <h3>Order Date: {orderDate}</h3>
            {
                orderProducts.map((product) => {
                    return  <OrderProduct key={product.id} imgUrl={product.imgUrl} quantity={product.quantity} price={product.price} name={product.name}/>
                } )
            }

            <h4>Total: {orderTotal}$</h4>
            <h5>order State: {orderStatus && handlers[orderStatus]}</h5>
        </StyledOrder>
    )
}

const OrderPage = () => {
    const [show, setShow] = useState(false)
    const [orderDataLoaded, setLoaded] = useState(false);

    const fetchOrderData = async () => {
        const {data: getData} = await axios.get(`${API_HOST}/orders`)
        console.log(getData);
        const orderData = await Promise.all(getData.map(async (order) => {

            const orderProducts = await Promise.all(order.detail.map( async (product) => {
                const productData = await axios.get(`${API_HOST}/product/${product.productId}`)

                return {
                    id: productData.id,
                    price: productData.price,
                    imgUrl: productData.img[0],
                    name: productData.name,
                    quantity: product.quantity
                }
            }))

            return {
                orderProducts,
                
            }
        }))
        
        setLoaded(true);
    }
    useEffect(() => {
        fetchOrderData();
        
    }, [])
    


    return (
        <DefaultLayout>
            <StyledOrderPage>
                <StyledTeb $isSelected={show}>
                    <li onClick={() => {setShow(prevShow => !prevShow)}}>
                        <h3>yeeeeee</h3>
                    </li>
                    {/* <li>
                        <h3>yee</h3>
                    </li> */}

                </StyledTeb>
                {
                    orderDataLoaded ?
                        <StyledOrderContainer>
                            <StyledOrder>
                                <h3>Order id: 1</h3>
                                <h3>Order Date: 2024/10/03 12:00:30</h3>
                                <OrderProduct imgUrl="/img/powerBank_product.png" quantity="12" price="30" name="product name"/>
                                <OrderProduct imgUrl="/img/powerBank_product.png" quantity="12" price="30" name="product name"/>
                                <OrderProduct imgUrl="/img/powerBank_product.png" quantity="12" price="30" name="product name"/>
                                <OrderProduct imgUrl="/img/powerBank_product.png" quantity="12" price="30" name="product name"/>

                                <h4>Total: 300$</h4>
                                <h5>order State: incomplete</h5>
                            </StyledOrder>
                                
                        </StyledOrderContainer> :
                        <LoadingAnimation/>
                }

                
            </StyledOrderPage>
        </DefaultLayout>
    )
}

export default OrderPage

const StyledOrderPage = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const StyledTeb = styled.ul`
    display: flex;
    li{
        display: flex;
        justify-content: center;
        padding: 0px 32px;

    }

    li::after{
        content: "";
        display: block;
        width: ${props => props.$isSelected ? "100%" : "0px"};
        height: 1px;
        transition: all 0.3s ease-out;
        border-bottom: 3px solid red;
        position: absolute;
        bottom: -5px;

    }


`

const StyledOrderContainer = styled.div`
    width: 100%;
    padding: 16px;    

`

const StyledOrder = styled.div`
    width: 100%;
    border-radius: 20px;
    border: 3px solid #8D5524;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;


    & > h3,h4,h5{
        padding: 16px;
        font-size: 24px;
    }
    
    & > h3{
        border-bottom: 3px #8D5524 solid;
    }

    & > h4{
        text-align: end;
        border-top: 3px #8D5524 solid;
        border-bottom: 3px #8D5524 solid;
    }

    @media screen and (max-width: 746px){

        & > h3,h4,h5{
            font-size: 18px;
        }

    }

`

const StyledOrderProductContainer = styled.div`
    width: 100%;
    padding: 16px;
    /* border: 1px solid black; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;

    div{
        display: flex;
        justify-content: space-between;
    }

    h3{
        font-size: 24px;
    }

    @media screen and (max-width: 746px){
        padding: 8px;

        h3{
            font-size: 16px;
        }

    }   

`

const StyledOrderProductImg = styled(StyledImgContainer)`
    border-radius: 20px;
    /* border: 2px #8D5524 solid; */
    background-color: #F1C27D;
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

    @media screen and (max-width: 746px){
        width:60px;
        
        & ~ span{
            width: 20px;
            height: 20px;
            font-size: 12px;
        }

    }
`