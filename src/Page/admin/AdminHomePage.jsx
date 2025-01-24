import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import { fetchAllCustomersData, fetchAllOrderData, processOrdersData } from "../../apiHelpers"
import AdminTable from "../../components/common/AdminTable"
import PropTypes from "prop-types"

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

InfoCard.propTypes = {
    infoName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    infoNum: PropTypes.number.isRequired,
}

const InfoCardList = ({totalOrders, totalSales, totalCustomers}) => {
    return (
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
    )
}

InfoCardList.propTypes = {
    totalOrders: PropTypes.number.isRequired,
    totalSales: PropTypes.number.isRequired,
    totalCustomers: PropTypes.number.isRequired,
}

const orderListHeaders = [
    { label: "Order id", key: "id"},
    { label: "Customer", key: "customerName"},
    { label: "Status", key: "status"},
    { label: "Date", key: "date"},
    { label: "Total", key: "total", unitSymbol: "$"},
]

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
            const ordersData = await fetchAllOrderData()
            const customersData = await fetchAllCustomersData()
    
            const customerAmount = customersData.length
            const orderAmount = ordersData.length
            const saleAmount = ordersData.reduce((total, order) => {
                const sumQuantity = order.detail.reduce((prevValue, product) => {                
                    return prevValue + Number(product.quantity)
                }, 0)
                
                return total + sumQuantity
            }, 0)
    
            const updateList = await processOrdersData(ordersData)
    
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
                <InfoCardList 
                    totalCustomers={totalCustomers}
                    totalOrders={totalOrders}
                    totalSales={totalSales}
                />
                <StyledOrderListContainer>
                    <h3>Lastest orders</h3>
                    <AdminTable 
                        datas={orderList} 
                        headers={orderListHeaders} 
                        dataLoaded={dataLoaded}
                        handleClickRow={goAdminOrder}    
                    />
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

    & > h3 {
        font-size: 24px;
        padding: 16px 0px;
    }

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