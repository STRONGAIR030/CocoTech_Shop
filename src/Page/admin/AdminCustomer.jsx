import { useNavigate, useParams } from "react-router";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { API_HOST } from "../../constants";
import axios from "axios";
import GoBackButton from "../../components/common/GoBackButton";
import styled from "styled-components";
import AdminTable from "../../components/common/AdminTable";
import EditOrderButton from "../../components/common/EditOrderButton";
import { fetchAllCustomersData, fetchOrderDataByCustomerId, processOrdersData } from "../../apiHelpers";

const NoOrder = () => {
  return <StyledNoOrder>
    <h3>This customer has no orders!</h3>
  </StyledNoOrder>;
};

const orderListHeaders = [
  { label: "Order id", key: "id"},
  { label: "Customer", key: "customerName"},
  { label: "Status", key: "status"},
  { label: "Date", key: "date"},
  { label: "Total", key: "total", unitSymbol: "$"},
  { label: "Edit", key: "editButton" },
]

const AdminCustomer = () => {
    const { customerId } = useParams();
    const [orderList, setOrderList] = useState([]);
    const [orderDataLoaded, setLoaded] = useState(false);

    useEffect(() => {
        const fectCustomerOrder = async () => {
            try {
                const customerOrdersData = await fetchOrderDataByCustomerId(customerId)
                
                const processedCustomerOrdersData = await processOrdersData(customerOrdersData)
                
                setOrderList(processedCustomerOrdersData);
                setLoaded(true);
            } catch (err) {
                console.error();
                (err);
            }
        };

        fectCustomerOrder();
    }, []);

    const orderListDatas = useMemo(() => {
        return orderList.map((order) => {
            return {
                ...order, 
                editButton: <EditOrderButton orderId={order.id} />
            }
        })
    }, [orderList])

    return (
        <AdminLayout>
            <StyledCustomerPage>
                <GoBackButton />
                <h3>CustomerId : {customerId}</h3>
                {orderDataLoaded && orderList.length ? (
                    <StyledCustomerOrdersContainer>
                        <AdminTable
                            headers={orderListHeaders}
                            datas={orderListDatas}
                            dataLoaded={true}
                        />
                    </StyledCustomerOrdersContainer>
                ) : (
                    <NoOrder />
                )}
            </StyledCustomerPage>
        </AdminLayout>
    );
};

export default AdminCustomer;

const StyledCustomerPage = styled.div`
    width: 100%;
    height: 100%;

    & > h3{
        padding: 16px;
        font-size: 32px;

        @media screen and (max-width: 746px){
            font-size: 24px;
        }
    }
`;

const StyledNoOrder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;

    h3{
        text-align: center;
        padding: 16px;
        font-size: 48px;
    }
`;

const StyledCustomerOrdersContainer = styled.div`
    width: 100%;
    padding: 16px 16px 16px 16px;

    & > h3{
        font-size: 28px;
        padding: 16px 8px;
    }

    td button {
    width: 40px;
    border-radius: 15px;
    padding: 8px;
    cursor: pointer;
  }
`