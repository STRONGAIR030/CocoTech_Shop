import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import axios from "axios"
import API_HOST from "../../ApiHost"
import StyledTableContainer from "../../components/common/StyledTableContainer"

const InfoCard = ({infoName, imgUrl, infoNum}) => {
    return(
        <StyledInfoCardContainer>
            <StyledInfoCard>
                <h2>{infoName}</h2>
                <div>
                    <StyledImgContainer $imgUrl={imgUrl}>
                        <div/>
                    </StyledImgContainer>
                    <h3>{infoNum}</h3>
                </div>
            </StyledInfoCard>
        </StyledInfoCardContainer>
    )
}

const AdminHomePage = () => {
    const [dataLoaded, setLoaded] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const navgation = useNavigate()

    const goAdminOrder = (orderId) => navgation(`/admin/orders/${orderId}`)
    useEffect(() => {
        fetchDashBoradData()
    }, [])

    const fetchDashBoradData = async () => {
        try{
            const getOrdersRes = await axios.get(`${API_HOST}/orders`)
            const getCustomerRes = await axios.get(`${API_HOST}/customers`)
            console.log(getOrdersRes);
            
            const orderListData = getOrdersRes.data
    
            const customerAmount = getCustomerRes.data.length
            const orderAmount = orderListData.length
            const saleAmount = orderListData.reduce((total, order) => {
                const sumQuantity = order.detail.reduce((prevValue, product) => {                
                    return prevValue + Number(product.quantity)
                }, 0)
                
                return total + sumQuantity
            }, 0)
    
            const updateList = await Promise.all(orderListData.map(async (order) => {
                const {data: customerData} = await axios(`${API_HOST}/customers/${order.customersId}`)
    
                const updateData = {
                    id: order.id,
                    customersId: order.customersId,
                    total: order.subTotal + order.shipping,
                    date: order.date,
                    customerName: customerData.name,
                    status: 0
                }
    
                return updateData
            }))
    
            const limtiList = updateList.reverse().filter((order, index) => Number(index) < 5)
            setTotalOrders(orderAmount)
            setTotalCustomers(customerAmount)
            setTotalSales(saleAmount)
            setOrderList(limtiList);
            setLoaded(true)
        } catch (err) {
            console.error(err);
        }
        
    }
    return (
        <AdminLayout>
            <StyledHomePage>
                <StyledInfoCardList>
                    <InfoCard 
                        imgUrl="/img/cart.svg" 
                        infoName="Total orders" 
                        infoNum={totalOrders}
                        />
                    <InfoCard 
                        imgUrl="/img/creditCard.svg" 
                        infoName="Total Sales" 
                        infoNum={totalSales}
                        />
                    <InfoCard 
                        imgUrl="/img/totalCustomers.svg" 
                        infoName="Total Customers" 
                        infoNum={totalCustomers}
                        />
                </StyledInfoCardList>

                <StyledOrderListContainer>
                    <h3>Lastest orders</h3>
                    <StyledTableContainer>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Order id</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Total</th>

                                </tr>
                                {
                                    dataLoaded && orderList.length && orderList.map((order) => {
                                        return (
                                            <tr key={order.id} onClick={() => {goAdminOrder(order.id)}}>
                                                <td>{order.id}</td>
                                                <td>{order.customerName}</td>
                                                <td>{order.status}</td>
                                                <td>{order.date}</td>
                                                <td>{order.total}$</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </StyledTableContainer>
                </StyledOrderListContainer>
            </StyledHomePage>
        </AdminLayout>
    )
}

export default AdminHomePage

const StyledHomePage = styled.div`
    width: 100%;
`

const StyledInfoCardList = styled.div`
    display: flex;
    flex-wrap: wrap;
`


const StyledInfoCardContainer = styled.div`
    width: 33.33%;
    padding: 16px;

    @media screen and (max-width: 746px){
        width: 50%;
    }

    @media screen and (max-width: 540px){
        width: 100%;
    }
`

const StyledInfoCard = styled.div`
    border-radius: 20px;
    /* border: 2px solid #ffdd84; */
    background-color: #C68642;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 15px;



    & > h2,div{
        padding: 16px;
    }

    & > h2{
        border-bottom: 2px solid #ffdd84;
    }

    & > div{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    & > div h3{
        font-size: 48px;
    }

    ${StyledImgContainer}{
        width: 80px;
    }


`

const StyledOrderListContainer = styled.div`
    width: 100%;
    padding: 16px;

    tr:not(:first-of-type){
        cursor: pointer;
        &:hover{
            background-color: yellow;
        }
    }

    @media screen and (max-width: 746px){
        div{
            max-height: 400px;
        }
    }


`