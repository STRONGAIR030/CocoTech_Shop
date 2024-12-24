import styled from "styled-components"
import AdminLayout from "../../components/layout/AdminLayout"
import { useNavigate } from "react-router"
import { useContext, useEffect, useState } from "react"
import AdminContext from "../../components/context/AdminContext"
import StyledImgContainer from "../../components/common/StyledImgContainer"
import axios from "axios"
import API_HOST from "../../ApiHost"

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
    const {adminInf} = useContext(AdminContext)
    const navgation = useNavigate()

    const goAdminLoginPage = () => navgation("/admin/login")

    useEffect(() => {
        fetchOrderListData()
    }, [])

    useEffect(() => {
        if(!adminInf.isSignIn){
            goAdminLoginPage();
        }
    }, [adminInf])

    const fetchOrderListData = async () => {
        const {data: orderListData} = await axios(`${API_HOST}/orders`)

        const updateList = await Promise.all(orderListData.map(async (order) => {
            const {data: userData} = await axios(`${API_HOST}/customers/${order.customersId}`)

            const updateData = {
                id: order.id,
                customersId: order.customersId,
                total: order.total,
                date: order.date,
                userName: userData.name,
                status: 0
            }

            return updateData
        }))

        console.log(updateList);
        setOrderList(updateList);
        
        
    }
    return (
        <AdminLayout>
            <StyledHomePage>
                <StyledInfoCardList>
                    <InfoCard imgUrl="/img/cart.svg" infoName="total orders" infoNum="3"/>
                    <InfoCard imgUrl="/img/cart.svg" infoName="total orders" infoNum="3"/>
                    <InfoCard imgUrl="/img/cart.svg" infoName="total orders" infoNum="3"/>
                </StyledInfoCardList>

                <StyledOrderListContainer>
                    <h3>Lastest orders</h3>
                    <div>
                        <table>
                            <tr>
                                <th>Order id</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>

                            </tr>
                            {
                                orderList.length && orderList.map((order) => {
                                    return (
                                        <tr>
                                            <td>{order.id}</td>
                                            <td>{order.userName}</td>
                                            <td>{order.status}</td>
                                            <td>{order.date}</td>
                                            <td>{order.total}$</td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div>
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

    div{
        width: 100%;
        overflow: scroll;
    }

    h3{
        padding: 16px 4px;
        font-size: 32px;
    }


    table,th,td{
        border-collapse: collapse;
        font-size: 24px;
        white-space: nowrap;
        text-align: center;
        
    }

    th,td{
        border-right: 2px black solid;
    }

    table{
        border: 2px outset black;
        border-radius: 20px;
        width: 100%;
        min-width: 700px;
    }

    tr{
        height: 60px;
    }

    tr:nth-child(odd){
        background-color: #C68642;
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