import styled from "styled-components"
import DefaultLayout from "../../components/layout/defaultLayout"
import { useContext, useEffect, useState } from "react"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import LoadingAnimation from "../../components/common/LoadingAnimation"
import FrontContext from "../../components/context/FrontContext"
import { fetchOrderDataByCustomerId, fetchProductData, processDetailedOrders } from "../../apiHelpers"
import PropTypes from "prop-types"

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

OrderProduct.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

const Order = ({orderId, orderProducts, orderStatus, orderDate, orderSubTotal, orderShipping}) => {
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

            <h4>Total: {orderSubTotal + orderShipping}$</h4>
            <h5>order State: {handlers[orderStatus]}</h5>
        </StyledOrder>
    )
}

Order.propTypes = {
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    orderStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    orderDate: PropTypes.string.isRequired,
    orderSubTotal: PropTypes.number.isRequired,
    orderShipping: PropTypes.number.isRequired,
}

const redenOrderList = (orderList, orderStatus) => {
    const filterList = orderList.filter(order => order.status == orderStatus)
    const reversedList = filterList.reverse();

    return (
        reversedList.length > 0 ? 
        reversedList.map((order) => {
            return <Order key={order.id} orderId={order.id} orderProducts={order.orderProducts} orderStatus={order.status} orderDate={order.date} orderSubTotal={order.subTotal} orderShipping={order.shipping}></Order>
        }) :
        <StyledNoOrderMessage>
            <h3>You don't have order!!</h3>
        </StyledNoOrderMessage>
    )    

}

const OrderPage = () => {
    const [selectedOrderStatus, setSlected] = useState(0)
    const [orderDataLoaded, setLoaded] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const {userInf} = useContext(FrontContext)

    const fetchOrderData = async () => {

        try{
                        
            const ordersData = await fetchOrderDataByCustomerId(userInf.id)
            
            const updatedOrderData = await processDetailedOrders(ordersData)
            
            setOrderList(updatedOrderData)
            setLoaded(true);
        } catch (err) {
            console.error(err);
            
        }
    }
    useEffect(() => {
        fetchOrderData();
    }, [])
    


    return (
        <DefaultLayout>
            <StyledOrderPage>
                <StyledTab>
                    <StyledTabItem onClick={() => {setSlected(0)}} $orderStatu={0} $selected={selectedOrderStatus}>
                        <h3>incomplete</h3>
                    </StyledTabItem>
                    <StyledTabItem onClick={() => {setSlected(2)}} $orderStatu={2} $selected={selectedOrderStatus}>
                        <h3>complete</h3>
                    </StyledTabItem>

                </StyledTab>
                {
                    orderDataLoaded ?

                        <StyledOrderContainer>
                                {
                                    orderList && redenOrderList(orderList, selectedOrderStatus)
                                }
                                
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

const StyledTab = styled.ul`
    display: flex;
`

const StyledTabItem = styled.li`
    display: flex;
    justify-content: center;
    padding: 0px 32px;


    &::after{
        content: "";
        display: block;
        width: ${props => props.$selected == props.$orderStatu ? "100%" : "0px"};
        height: 1px;
        transition: all 0.3s ease-out;
        border-bottom: 3px solid #8D5524;
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
    margin: 16px 0px;
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

const StyledNoOrderMessage = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    h3{
        font-size: 24px
    }
`